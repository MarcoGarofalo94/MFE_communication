<?php


namespace OCA\Customappname1\Settings;

use OC\AppConfig;
use OCA\VideoViewer\Utils\JsonHandler;
use OCP\IDbConnection;

class SettingsManager {

    protected $appConfig;

    public function __construct() {
        $this->appConfig = \OC::$server->getAppConfig();
    }



}