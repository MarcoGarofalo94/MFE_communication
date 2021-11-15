<?php


namespace OCA\CorecomDashboard\Controller;


use OCA\CorecomDashboard\Utils\JsonResponseException;
use OCA\CorecomDashboard\Utils\TeracueApiManager;
use OCP\AppFramework\Controller;
use OCP\AppFramework\Http\DataResponse;
use OCP\IRequest;
use Throwable;

class InterfaceApiController extends Controller {

    private $userId;

    public function __construct($AppName, IRequest $request, $userId) {
        parent::__construct($AppName, $request);
        $this->userId = $userId;
    }

    public function handleException ($e) {
        if(get_class($e) == JsonResponseException::class)
            return ['success' => false, 'class' => get_class($this), 'data' => $e->getErrorData()];
        else
            return ['success' => false, 'class' => get_class($this), 'message' => $e->getMessage()];
    }

    private function aggregateTunersData($src, &$dest, $dest_key) {
        if($src["success"]) {
            $src = $src["result"];
            foreach (array_keys($src) as $k) {
                if(array_key_exists($k, $dest)) {
                    if(!array_key_exists($dest_key, $dest[$k]))
                        $dest[$k][$dest_key] = [];
                    $dest[$k][$dest_key] = $src[$k];
                }
            }
        }
    }

    /**
     * CAUTION: the @Stuff turns off security checks; for this page no admin is
     *          required and no CSRF check. If you don't know what CSRF is, read
     *          it up in the docs or you might create a security hole. This is
     *          basically the only required method to add this exemption, don't
     *          add it to any other method if you don't exactly know what it does
     *
     * @NoAdminRequired
     * @NoCSRFRequired
     */
    public function getTunersManagerTunersStatus() {
        try {
            $bitrates = TeracueApiManager::getTunersBitRates();
            $status = TeracueApiManager::getTunersStatus();
            $config = TeracueApiManager::getTunersConfigurations();
            $programs = TeracueApiManager::getRemuxProgramConfiguration();
            $res = ["success" => false, "result" => []];
            if($status["success"]) {
                $res["success"] = true;
                $res["result"] = $status["result"];     // Use status data as base for our result.
                $this->aggregateTunersData($bitrates,  $res["result"], "bitrates");
                $this->aggregateTunersData($config,  $res["result"], "configuration");
                $this->aggregateTunersData($programs,  $res["result"], "programs");
            }
            return new DataResponse($res);
        } catch (Throwable $e) {
            return $this->handleException($e);
        }
    }

}