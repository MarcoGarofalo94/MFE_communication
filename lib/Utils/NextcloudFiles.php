<?php

namespace OCA\UnimeDocs\Utils;

use OCP\DB\QueryBuilder\IQueryBuilder;

class NextcloudFiles
{
  public static function canAccessFile($fileId)
  {
    try {
      \OC\Files\Filesystem::getPath($fileId);
      return true;
    } catch (\Throwable $e) {
      return false;
    }
  }

  public static function canAccessFilePath($path)
  {
    try {
      \OC\Files\Filesystem::getOwner($path);
      return true;
    } catch (\Throwable $e) {
      return false;
    }
  }

  public static function getFileOwner($fileId)
  {
    try {
      return \OC\Files\Filesystem::getOwner(
        \OC\Files\Filesystem::getPath($fileId)
      );
    } catch (\Throwable $e) {
      return null;
    }
  }

  public static function getFile($fileId)
  {
    try {
      $qb = \OC::$server->getDatabaseConnection()->getQueryBuilder();

      // If the file isn't owned/shared by/with the current user, this avoid also to get files from trash.
      if (!self::canAccessFile($fileId)) {
        return null;
      }

      $and = $qb->expr()->andX();
      $and->add(
        $qb
          ->expr()
          ->eq(
            "fc.fileid",
            $qb->createNamedParameter($fileId, IQueryBuilder::PARAM_INT)
          )
      );

      $qb
        ->select("fileid", "name", "path", "m.mimetype", "fc.etag", "size")
        ->from("filecache", "fc")
        ->join("fc", "mimetypes", "m", "fc.mimetype = m.id")
        ->where($and);

      $cursor = $qb->execute();
      $row = $cursor->fetch();
      $row["path"] = \OC\Files\Filesystem::getPath($fileId);
      $a = explode("/", $row["path"]);
      $a = array_slice($a, 0, sizeof($a) - 1);
      if ($a[0] == "files" || $a[0] == "") {
        $a = array_slice($a, 1, sizeof($a));
      }
      $row["path"] = "/" . implode("/", $a);
      $cursor->closeCursor();

      if ($row) {
        return $row;
      }
    } catch (\Throwable $e) {
      //
    }

    return null;
  }

  /**
   * Get the full file path by fileId
   * the user must have access to the file
   *
   * @return string full path of the file (es. /<user>/files/<file_path>)
   * */
  public static function getFullPath($fileId)
  {
    $path = \OC\Files\Filesystem::getPath($fileId);
    $owner = self::getFileOwner($fileId);
    $root = "/" . $owner . "/files";
    return $root . $path;
  }

  /**
   * Get the full file real path (absolute) by fileId
   * the user must have access to the file
   *
   * @return string full path of the file (es. /var/www/html/data/<user>/files/<file_path>)
   * */
  public static function getFullRealPath($fileId)
  {
    return realpath(self::getDataDirectory() . self::getFullPath($fileId));
  }

  public static function saveDataToTmp($data, $filename)
  {
    if ($data) {
      $extension = pathinfo($filename, PATHINFO_EXTENSION);
      $tmpFile = \OC::$server->getTempManager()->getTemporaryFile($extension);
      file_put_contents($tmpFile, $data);
      return $tmpFile;
    } else {
      return null;
    }
  }

  public static function curlFileFromContent(
    $file_content,
    $file_name,
    $file_mime
  ) {
    $tmpFile = self::saveDataToTmp($file_content, $file_name);
    if ($tmpFile == null) {
      return null;
    }

    $curlFile = new \CURLFile(realpath($tmpFile));
    $curlFile->setMimeType($file_mime);
    $curlFile->setPostFilename($file_name);

    return $curlFile;
  }

  public static function curlFileFromPath($file_path, $file_name, $file_mime)
  {
    $curlFile = new \CURLFile(realpath($file_path));
    $curlFile->setMimeType($file_mime);
    $curlFile->setPostFilename($file_name);

    return $curlFile;
  }

  public static function curlFileFromFileId(
    $fileId,
    $userId = null,
    $file_name = null,
    $file_mime = null
  ) {
    $file = self::getFile($fileId);
    if ($file == null) {
      throw new \Exception(
        "Unable to retrieve file (" . $fileId . ") as user (" . $userId . ")"
      );
    }

    $fullpath = self::getFullRealPath($fileId);

    if ($file_name == null) {
      $file_name = $file["name"];
    }

    if ($file_mime == null) {
      $file_mime = $file["mimetype"];
    }

    return self::curlFileFromPath($fullpath, $file_name, $file_mime);
  }

  public static function unlinkCurlFile($curlFile)
  {
    return unlink($curlFile->getFilename());
  }

  public static function getDataDirectory()
  {
    return \OC::$server->getSystemConfig()->getValue("datadirectory");
  }

  private static $visitedFolders = 0;
  private static $validFiles = [];

  public static function retrieveFiles(
    string $root,
    string $nameFilter = null,
    array $allowedMimeTypes = null,
    int $max_folders = 100
  ) {
    $currentStep = self::$visitedFolders;
    if ($currentStep == 0) {
      self::$validFiles = [];
    }

    self::$visitedFolders++;

    $files = \OC\Files\Filesystem::getDirectoryContent($root);
    foreach ($files as $f) {
      //$mime = $f->getMimetype();

      $path = explode("/", $f->getPath());
      $path = implode("/", array_slice($path, 3, sizeof($path) - 4));

      $fl = [
        "id" => $f->getId(),
        "name" => $f->getName(),
        "mimetype" => $f->getMimetype(),
        "path" => $path,
      ];

      if ($fl["mimetype"] == "httpd/unix-directory") {
        if (self::$visitedFolders < $max_folders) {
          self::retrieveFiles(
            \OC\Files\Filesystem::getPath($f->getId()),
            $nameFilter,
            $allowedMimeTypes,
            $max_folders
          );
        }
      } elseif (
        ($allowedMimeTypes == null ||
          in_array($fl["mimetype"], $allowedMimeTypes)) &&
        ($nameFilter == null ||
          ($nameFilter != null && strpos($fl["name"], $nameFilter) !== false))
      ) {
        array_push(self::$validFiles, $fl);
      }
    }

    if ($currentStep == 0) {
      self::$visitedFolders = 0;
    }

    return self::$validFiles;
  }

  private static $currentDepth = 0;

  public static function listFiles(
    string $root,
    array $allowedMimeTypes = null,
    int $max_depth = 0
  ) {
    $currentDepth = self::$currentDepth;
    $validFiles = [];

    $files = \OC\Files\Filesystem::getDirectoryContent($root);

    foreach ($files as $f) {
      //$mime = $f->getMimetype();

      $path = explode("/", $f->getPath());
      $path = implode("/", array_slice($path, 3, sizeof($path) - 4));

      $fl = [
        "id" => $f->getId(),
        "name" => $f->getName(),
        "mimetype" => $f->getMimetype(),
        "path" => $path,
      ];

      if (
        $fl["mimetype"] == "httpd/unix-directory" &&
        in_array("httpd/unix-directory", $allowedMimeTypes)
      ) {
        if ($currentDepth < $max_depth) {
          self::$currentDepth++;
          $fl["files"] = self::listFiles(
            \OC\Files\Filesystem::getPath($f->getId()),
            $allowedMimeTypes,
            $max_depth
          );
        }
      }

      if (
        $allowedMimeTypes == null ||
        in_array($fl["mimetype"], $allowedMimeTypes)
      ) {
        array_push($validFiles, $fl);
      }
    }

    if ($currentDepth == 0) {
      self::$currentDepth = 0;
    }

    return $validFiles;
  }

  public static function getContent(int $fileId)
  {
    $file = self::getFile($fileId);
    return \OC\Files\Filesystem::file_get_contents(
      $file["path"] . "/" . $file["name"]
    );
  }

  public static function streamFile(int $fileId)
  {
    $file = self::getFile($fileId);
    $fileHandle = \OC\Files\Filesystem::fopen(
      $file["path"] . "/" . $file["name"],
      "rb"
    );
    if ($fileHandle) {
      $size = $file["size"]; // File size
      $length = $size; // Content length
      $start = 0; // Start byte
      $end = $size - 1; // End byte
      header("Content-Type: " . $file["mimetype"]);
      header("Accept-Ranges: 0-$length");
      header("Accept-Ranges: bytes");
      header("Cache-Control: no-store, no-cache");

      if (isset($_SERVER["HTTP_RANGE"])) {
        $c_start = $start;
        $c_end = $end;
        list(, $range) = explode("=", $_SERVER["HTTP_RANGE"], 2);
        if (strpos($range, ",") !== false) {
          header("HTTP/1.1 416 Requested Range Not Satisfiable");
          header("Content-Range: bytes $start-$end/$size");
          exit();
        }
        if ($range == "-") {
          $c_start = $size - substr($range, 1);
        } else {
          $range = explode("-", $range);
          $c_start = $range[0];
          $c_end =
            isset($range[1]) && is_numeric($range[1]) ? $range[1] : $size;
        }
        $c_end = $c_end > $end ? $end : $c_end;
        if ($c_start > $c_end || $c_start > $size - 1 || $c_end >= $size) {
          header("HTTP/1.1 416 Requested Range Not Satisfiable");
          header("Content-Range: bytes $start-$end/$size");
          exit();
        }
        $start = $c_start;
        $end = $c_end;
        $length = $end - $start + 1;
        fseek($fileHandle, $start);
        header("HTTP/1.1 206 Partial Content");
      }
      header("Content-Range: bytes $start-$end/$size");
      header("Content-Length: " . $length);

      $buffer = 1024 * 8;

      while (!feof($fileHandle) && ($p = ftell($fileHandle)) <= $end) {
        if ($p + $buffer > $end) {
          $buffer = $end - $p + 1;
        }
        set_time_limit(0);
        echo fread($fileHandle, $buffer);
        ob_flush();
      }

      fclose($fileHandle);
    }
  }

  public static function putFile(string $folder, $file)
  {
    $path = $folder . "/" . $file["name"];
    if (
      !array_key_exists("name", $file) ||
      !array_key_exists("base64", $file) ||
      empty($file["name"]) ||
      empty($file["base64"])
    ) {
      return false;
    }

    //If folder doesn't exists create it
    if (!\OC\Files\Filesystem::file_exists($folder)) {
      \OC\Files\Filesystem::mkdir($folder);
    }

    //If folder exists and it's a directory
    if (\OC\Files\Filesystem::is_dir($folder)) {
      //Always overwrite the file.
      \OC\Files\Filesystem::file_put_contents(
        $path,
        base64_decode($file["base64"])
      );
      return true;
    }

    return false;
  }
}
