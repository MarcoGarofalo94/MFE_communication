<?php
/**
 * Created by PhpStorm.
 * User: Davide
 * Date: 25/09/2016
 * Time: 14:07
 */

//Version 2.0

namespace OCA\CorecomDashboard\Utils;

use RuntimeException;

class JsonHandler {

    protected static $_messages = array(
        JSON_ERROR_NONE => 'No error has occurred',
        JSON_ERROR_DEPTH => 'The maximum stack depth has been exceeded',
        JSON_ERROR_STATE_MISMATCH => 'Invalid or malformed JSON',
        JSON_ERROR_CTRL_CHAR => 'Control character error, possibly incorrectly encoded',
        JSON_ERROR_SYNTAX => 'Syntax error',
        JSON_ERROR_UTF8 => 'Malformed UTF-8 characters, possibly incorrectly encoded'
    );

    public static function encode($value, $escape = true, $options = 0) {

        $result = json_encode($value, $options);

        if($result)  {
            if(!$escape) {
                $result = json_encode($result);
                $result = str_replace("\\u", "\\\\u", $result);
                $result = str_replace("\\\"", "\\\\\"", $result);
                $result = stripcslashes($result);
                $result = json_decode($result);
            }
            return $result;
        }

        throw new RuntimeException(static::$_messages[json_last_error()]);
    }

    public static function decode($json, $assoc = true) {

        $result = json_decode($json, $assoc);

        if($result != false) {
            return $result;
        }

        throw new RuntimeException(static::$_messages[json_last_error()]);
    }

}
?>