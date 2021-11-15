<?php
namespace OCA\CorecomDashboard\Utils;

use Exception;
use OCA\VideoViewer\Utils\JsonHandler;
use Throwable;

class JsonResponseException extends Exception {

    protected $data = null;

    public function __construct(array $data, Throwable $previous = null){
        parent::__construct("OCA\CorecomDashboard\Utils\JsonResponseException: " . JsonHandler::encode($data), 0, $previous);
        $this->data = $data;
    }

    public function getErrorData() {
        return $this->data;
    }

}