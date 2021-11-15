<?php
namespace OCA\CorecomDashboard\Service;

use Exception;
use Throwable;

class ServiceException extends Exception {

    const ERROR_CUSTOM = -1;
    const EXCEPTION_GENERIC = 0;
    const ERROR_GENERIC = 1;
    const EXCEPTION_PARAMETERS_MISS = 2;
    const ERROR_PARAMETERS_TYPE = 3;
    const ERROR_SQL = 4;

    const messages = [

        -1 => '',
        0 => 'Generic exception.',
        1 => 'Generic error.',
        2 => 'One or more parameters are missed.',
        3 => 'One or more parameters have a wrong data type.',
        4 => 'SQL exception'

    ];

    protected $message_code = null;

    public function __construct($code = 0, $desc = '', $message_code = null, Throwable $previous = null){
        parent::__construct(self::getErrorMessage($code, $desc), $code, $previous);
        $this->message_code = $message_code;
    }

    public function getMessageCode(){
        return $this->message_code;
    }

    public static function getErrorMessage($code, $desc = '') {
        return self::messages[$code] . $desc;
    }

}