<?php

namespace OCA\CorecomDashboard\Controller;

use OCA\CorecomDashboard\Utils\JsonHandler;
use OCA\CorecomDashboard\Utils\JsonResponseException;
use OCA\CorecomDashboard\Utils\TeracueApiManager;
use OCP\IRequest;
use OCP\AppFramework\Http\TemplateResponse;
use OCP\AppFramework\Http\DataResponse;
use OCP\AppFramework\Http\ContentSecurityPolicy;
use OCP\AppFramework\Controller;
use Throwable;
use TypeError;

class TeracueApiController extends Controller{

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
    public function getTunersBitrates() {
        try {
            return new DataResponse(TeracueApiManager::getTunersBitRates());
        } catch (Throwable $e) {
            return $this->handleException($e);
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
    public function getTunersStatus() {
        try {
             return new DataResponse(TeracueApiManager::getTunersStatus());
        } catch (Throwable $e) {
            return $this->handleException($e);
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
    public function getTunersConfigurations() {
        try {
           return new DataResponse(TeracueApiManager::getTunersConfigurations());
        } catch (Throwable $e) {
            return $this->handleException($e);
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
    public function setTunersConfigurations() {
        try {
            $config = $_POST["config"];
            //$config = '{"tuner4":{"tunerIndex":"3","tuner_type":"7","t2_tuner_signal_type":"0","qamfreq_c":"500000","qamfreq_t":"770000","qamfreq_t2":"500000","tuner_t2_bandwidtha_ch106a":"2","tuner_t_bandwidtha_ch106a":"2","tuner_c_bandwidtha_ch106a":"2","plp_id_count":"0","tuner_muti_plp":"0"}}';
            return new DataResponse(TeracueApiManager::setTunersConfigurations($config));
        } catch (Throwable $e) {
            return $this->handleException($e);
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
    public function getRemuxConfiguration() {
        try {
            return new DataResponse(TeracueApiManager::getRemuxConfiguration());
        } catch (Throwable $e) {
            return $this->handleException($e);
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
    public function getRemuxProgramConfiguration() {
        try {
            return new DataResponse(TeracueApiManager::getRemuxProgramConfiguration());
        } catch (Throwable $e) {
            return $this->handleException($e);
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
    public function setRemuxProgramConfiguration() {
        try {
            //$_POST =  json_decode(file_get_contents("php://input"),true);
            $config = $_POST["config"];
            //$config = '{"tuner1":[{"pid":"3401","pname":"Rai 1","pchecked":true},{"pid":"3402","pname":"Rai 2","pchecked":true},{"pid":"3403","pname":"Rai 3 TGR Calabria","pchecked":true},{"pid":"3404","pname":"Rai Radio1","pchecked":false},{"pid":"3405","pname":"Rai Radio2","pchecked":false},{"pid":"3406","pname":"Rai Radio3","pchecked":false},{"pid":"3411","pname":"Rai News 24","pchecked":true},{"pid":"3410","pname":"Test HEVC main10","pchecked":false}],"tuner2":[{"pid":"1","pname":"Video Calabria","pchecked":false},{"pid":"2","pname":"eMEDICINA","pchecked":true},{"pid":"3","pname":"eFOOD","pchecked":false},{"pid":"11","pname":"Video Calabria HD","pchecked":true},{"pid":"22","pname":"ESPERIA TV","pchecked":false},{"pid":"23","pname":"ESPERIA TV +1","pchecked":false},{"pid":"31","pname":"TGCAL24.IT","pchecked":false},{"pid":"41","pname":"Video Touring","pchecked":false},{"pid":"100","pname":"Radio Margherita","pchecked":false},{"pid":"770","pname":"CAPRICCIO","pchecked":false},{"pid":"771","pname":"Ten","pchecked":false},{"pid":"772","pname":"CALABRIASONA","pchecked":false},{"pid":"773","pname":"Ten HD","pchecked":false},{"pid":"774","pname":"RTV","pchecked":false}],"tuner3":[{"pid":"1","pname":"CALABRIA TV","pchecked":true},{"pid":"2","pname":"ESSE TV","pchecked":false},{"pid":"8","pname":"Tele Dehon","pchecked":false},{"pid":"43","pname":"RADIO ITALIANISSIMA","pchecked":false},{"pid":"45","pname":"RADIO ENNE LAMEZIA","pchecked":false},{"pid":"47","pname":"RADIO NEWS 24","pchecked":false},{"pid":"48","pname":"RADIO JUKEBOX","pchecked":false},{"pid":"49","pname":"RADIO RICORDI","pchecked":false},{"pid":"112","pname":"ESSE TV HD TEST","pchecked":false},{"pid":"257","pname":"TELESPAZIO TV","pchecked":true},{"pid":"272","pname":"Tele Dehon +1","pchecked":false},{"pid":"513","pname":"MI SPOSO TV","pchecked":true},{"pid":"995","pname":"TELESPAZIO TV HD TEST","pchecked":false},{"pid":"996","pname":"CALABRIA TV HD TEST","pchecked":false},{"pid":"254","pname":"LA GRANDE ITALIA","pchecked":false},{"pid":"211","pname":"L\'altro Corriere","pchecked":false},{"pid":"16","pname":"TELE MODA","pchecked":true},{"pid":"19","pname":"TELE DONNA","pchecked":true},{"pid":"1000","pname":"PLAY TV","pchecked":false},{"pid":"624","pname":"TELESPAZIO TV FASHION","pchecked":false},{"pid":"180","pname":"RADIO JUKEBOX TV","pchecked":false},{"pid":"280","pname":"RADIO JUKEBOX TV","pchecked":false}],"tuner4":[{"pid":"1282","pname":"S95 MELITO TV","pchecked":false},{"pid":"1283","pname":"TELE BOVA MARINA","pchecked":true},{"pid":"1284","pname":"Soverato Uno S1","pchecked":false},{"pid":"1545","pname":"Ten HD","pchecked":false}],"tuner5":[{"pid":"50","pname":"Motor Trend","pchecked":false},{"pid":"60","pname":"ALMA TV","pchecked":false},{"pid":"65","pname":"BOM Channel","pchecked":false},{"pid":"70","pname":"ALICE","pchecked":false},{"pid":"75","pname":"CASEDESIGNSTILI","pchecked":false},{"pid":"80","pname":"MARCOPOLO","pchecked":false},{"pid":"85","pname":"PopEconomy","pchecked":false},{"pid":"90","pname":"CANALE 63","pchecked":false},{"pid":"100","pname":"TV2000","pchecked":false},{"pid":"105","pname":"RADIO VATICANA ITALIA","pchecked":false},{"pid":"110","pname":"SFERA TV","pchecked":false},{"pid":"115","pname":"CUSANO ITALIA TV","pchecked":false},{"pid":"120","pname":"RADIO KISS KISS TV","pchecked":false},{"pid":"125","pname":"Parole di Vita","pchecked":false},{"pid":"130","pname":"RADIO ZETA","pchecked":false},{"pid":"135","pname":"BABEL-ROMIT TV","pchecked":false},{"pid":"140","pname":"Mediatext.it","pchecked":false},{"pid":"145","pname":"RDS Social TV","pchecked":false}],"tuner6":[{"pid":"1","pname":"Video Calabria","pchecked":false},{"pid":"2","pname":"eMEDICINA","pchecked":false},{"pid":"3","pname":"eFOOD","pchecked":true},{"pid":"11","pname":"Video Calabria HD","pchecked":false},{"pid":"22","pname":"ESPERIA TV","pchecked":false},{"pid":"23","pname":"ESPERIA TV +1","pchecked":false},{"pid":"31","pname":"TGCAL24.IT","pchecked":false},{"pid":"41","pname":"Video Touring","pchecked":false},{"pid":"100","pname":"Radio Margherita","pchecked":false},{"pid":"770","pname":"CAPRICCIO","pchecked":false},{"pid":"771","pname":"Ten","pchecked":false},{"pid":"772","pname":"CALABRIASONA","pchecked":false},{"pid":"773","pname":"Ten HD","pchecked":false},{"pid":"774","pname":"RTV","pchecked":false}],"tuner7":[{"pid":"1","pname":"Video Calabria","pchecked":false},{"pid":"2","pname":"eMEDICINA","pchecked":false},{"pid":"3","pname":"eFOOD","pchecked":false},{"pid":"11","pname":"Video Calabria HD","pchecked":false},{"pid":"22","pname":"ESPERIA TV","pchecked":true},{"pid":"23","pname":"ESPERIA TV +1","pchecked":false},{"pid":"31","pname":"TGCAL24.IT","pchecked":false},{"pid":"41","pname":"Video Touring","pchecked":false},{"pid":"100","pname":"Radio Margherita","pchecked":false},{"pid":"770","pname":"CAPRICCIO","pchecked":false},{"pid":"771","pname":"Ten","pchecked":false},{"pid":"772","pname":"CALABRIASONA","pchecked":false},{"pid":"773","pname":"Ten HD","pchecked":false},{"pid":"774","pname":"RTV","pchecked":false}],"tuner8":[{"pid":"1","pname":"Video Calabria","pchecked":false},{"pid":"2","pname":"eMEDICINA","pchecked":false},{"pid":"3","pname":"eFOOD","pchecked":false},{"pid":"11","pname":"Video Calabria HD","pchecked":false},{"pid":"22","pname":"ESPERIA TV","pchecked":false},{"pid":"23","pname":"ESPERIA TV +1","pchecked":false},{"pid":"31","pname":"TGCAL24.IT","pchecked":false},{"pid":"41","pname":"Video Touring","pchecked":false},{"pid":"100","pname":"Radio Margherita","pchecked":false},{"pid":"770","pname":"CAPRICCIO","pchecked":false},{"pid":"771","pname":"Ten","pchecked":false},{"pid":"772","pname":"CALABRIASONA","pchecked":false},{"pid":"773","pname":"Ten HD","pchecked":true},{"pid":"774","pname":"RTV","pchecked":false}]}';
            return new DataResponse(TeracueApiManager::setRemuxProgramConfiguration($config));
        } catch (Throwable $e) {
            return $this->handleException($e);
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
    public function getTsipConfiguration() {
        try {
            return new DataResponse(TeracueApiManager::getTSIPConfiguration());
        } catch (Throwable $e) {
            return $this->handleException($e);
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
    public function setTsipConfiguration() {
        try {
            $config = $_POST["config"];
            return new DataResponse(TeracueApiManager::setTSIPConfiguration($config));
        } catch (Throwable $e) {
            return $this->handleException($e);
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
    public function getIptvConfiguration() {
        try {
            return new DataResponse(TeracueApiManager::getIPTVConfiguration());
        } catch (Throwable $e) {
            return $this->handleException($e);
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
    public function setIptvConfiguration() {
        try {
            $config = $_POST["config"] ?? null;
            if($config == null)
                return new DataResponse(["success" => false, "result" => "No configuration specified."]);
            /*$config = '{    "iptv": [
      {
        "pid": "1051",
        "pname": "Rai 3 HD",
        "pchecked": true
      },
      {
        "pid": "1052",
        "pname": "Rai 2 HD",
        "pchecked": true
      },
      {
        "pid": "1053",
        "pname": "Rai Sport",
        "pchecked": true
      },
      {
        "pid": "1054",
        "pname": "Rai Scuola",
        "pchecked": true
      },
      {
        "pid": "1055",
        "pname": "Rai Storia",
        "pchecked": false
      },
      {
        "pid": "1057",
        "pname": "Rai 5",
        "pchecked": false
      },
      {
        "pid": "1058",
        "pname": "RTV San Marino",
        "pchecked": false
      }
    ]
  }';*/
            return new DataResponse(TeracueApiManager::setIPTVConfiguration($config));
        } catch (Throwable $e) {
            return $this->handleException($e);
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
    public function getIptvProgramConfiguration() {
        try {
            return new DataResponse(TeracueApiManager::getIPTVProgramConfiguration());
        } catch (Throwable $e) {
            return $this->handleException($e);
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
    public function setIptvProgramConfiguration() {
        try {
            $config = $_POST["config"] ?? null;
            if($config == null)
                return new DataResponse(["success" => false, "result" => "No configuration specified."]);
            return new DataResponse(TeracueApiManager::setIPTVProgramConfiguration($config));
        } catch (Throwable $e) {
            return $this->handleException($e);
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
    public function setProgramConfiguration() {
        try {
            $config = $_POST["config"] ?? null;
            if($config == null)
                return new DataResponse(["success" => false, "result" => "No configuration specified."]);
            //$config = '{"tuner1":[{"pid":"3401","pname":"Rai 1","pchecked":true},{"pid":"3402","pname":"Rai 2","pchecked":true},{"pid":"3403","pname":"Rai 3 TGR Calabria","pchecked":true},{"pid":"3404","pname":"Rai Radio1","pchecked":false},{"pid":"3405","pname":"Rai Radio2","pchecked":false},{"pid":"3406","pname":"Rai Radio3","pchecked":false},{"pid":"3411","pname":"Rai News 24","pchecked":true},{"pid":"3410","pname":"Test HEVC main10","pchecked":false}],"tuner2":[{"pid":"1","pname":"Video Calabria","pchecked":false},{"pid":"2","pname":"eMEDICINA","pchecked":true},{"pid":"3","pname":"eFOOD","pchecked":false},{"pid":"11","pname":"Video Calabria HD","pchecked":true},{"pid":"22","pname":"ESPERIA TV","pchecked":false},{"pid":"23","pname":"ESPERIA TV +1","pchecked":false},{"pid":"31","pname":"TGCAL24.IT","pchecked":false},{"pid":"41","pname":"Video Touring","pchecked":false},{"pid":"100","pname":"Radio Margherita","pchecked":false},{"pid":"770","pname":"CAPRICCIO","pchecked":false},{"pid":"771","pname":"Ten","pchecked":false},{"pid":"772","pname":"CALABRIASONA","pchecked":false},{"pid":"773","pname":"Ten HD","pchecked":false},{"pid":"774","pname":"RTV","pchecked":false}],"tuner3":[{"pid":"1","pname":"CALABRIA TV","pchecked":true},{"pid":"2","pname":"ESSE TV","pchecked":false},{"pid":"8","pname":"Tele Dehon","pchecked":false},{"pid":"43","pname":"RADIO ITALIANISSIMA","pchecked":false},{"pid":"45","pname":"RADIO ENNE LAMEZIA","pchecked":false},{"pid":"47","pname":"RADIO NEWS 24","pchecked":false},{"pid":"48","pname":"RADIO JUKEBOX","pchecked":false},{"pid":"49","pname":"RADIO RICORDI","pchecked":false},{"pid":"112","pname":"ESSE TV HD TEST","pchecked":false},{"pid":"257","pname":"TELESPAZIO TV","pchecked":true},{"pid":"272","pname":"Tele Dehon +1","pchecked":false},{"pid":"513","pname":"MI SPOSO TV","pchecked":true},{"pid":"995","pname":"TELESPAZIO TV HD TEST","pchecked":false},{"pid":"996","pname":"CALABRIA TV HD TEST","pchecked":false},{"pid":"254","pname":"LA GRANDE ITALIA","pchecked":false},{"pid":"211","pname":"L\'altro Corriere","pchecked":false},{"pid":"16","pname":"TELE MODA","pchecked":true},{"pid":"19","pname":"TELE DONNA","pchecked":true},{"pid":"1000","pname":"PLAY TV","pchecked":false},{"pid":"624","pname":"TELESPAZIO TV FASHION","pchecked":false},{"pid":"180","pname":"RADIO JUKEBOX TV","pchecked":false},{"pid":"280","pname":"RADIO JUKEBOX TV","pchecked":false}],"tuner4":[{"pid":"1282","pname":"S95 MELITO TV","pchecked":false},{"pid":"1283","pname":"TELE BOVA MARINA","pchecked":true},{"pid":"1284","pname":"Soverato Uno S1","pchecked":false},{"pid":"1545","pname":"Ten HD","pchecked":false}],"tuner5":[{"pid":"50","pname":"Motor Trend","pchecked":false},{"pid":"60","pname":"ALMA TV","pchecked":false},{"pid":"65","pname":"BOM Channel","pchecked":false},{"pid":"70","pname":"ALICE","pchecked":false},{"pid":"75","pname":"CASEDESIGNSTILI","pchecked":false},{"pid":"80","pname":"MARCOPOLO","pchecked":false},{"pid":"85","pname":"PopEconomy","pchecked":false},{"pid":"90","pname":"CANALE 63","pchecked":false},{"pid":"100","pname":"TV2000","pchecked":false},{"pid":"105","pname":"RADIO VATICANA ITALIA","pchecked":false},{"pid":"110","pname":"SFERA TV","pchecked":false},{"pid":"115","pname":"CUSANO ITALIA TV","pchecked":false},{"pid":"120","pname":"RADIO KISS KISS TV","pchecked":false},{"pid":"125","pname":"Parole di Vita","pchecked":false},{"pid":"130","pname":"RADIO ZETA","pchecked":false},{"pid":"135","pname":"BABEL-ROMIT TV","pchecked":false},{"pid":"140","pname":"Mediatext.it","pchecked":false},{"pid":"145","pname":"RDS Social TV","pchecked":false}],"tuner6":[{"pid":"1","pname":"Video Calabria","pchecked":false},{"pid":"2","pname":"eMEDICINA","pchecked":false},{"pid":"3","pname":"eFOOD","pchecked":true},{"pid":"11","pname":"Video Calabria HD","pchecked":false},{"pid":"22","pname":"ESPERIA TV","pchecked":false},{"pid":"23","pname":"ESPERIA TV +1","pchecked":false},{"pid":"31","pname":"TGCAL24.IT","pchecked":false},{"pid":"41","pname":"Video Touring","pchecked":false},{"pid":"100","pname":"Radio Margherita","pchecked":false},{"pid":"770","pname":"CAPRICCIO","pchecked":false},{"pid":"771","pname":"Ten","pchecked":false},{"pid":"772","pname":"CALABRIASONA","pchecked":false},{"pid":"773","pname":"Ten HD","pchecked":false},{"pid":"774","pname":"RTV","pchecked":false}],"tuner7":[{"pid":"1","pname":"Video Calabria","pchecked":false},{"pid":"2","pname":"eMEDICINA","pchecked":false},{"pid":"3","pname":"eFOOD","pchecked":false},{"pid":"11","pname":"Video Calabria HD","pchecked":false},{"pid":"22","pname":"ESPERIA TV","pchecked":true},{"pid":"23","pname":"ESPERIA TV +1","pchecked":false},{"pid":"31","pname":"TGCAL24.IT","pchecked":false},{"pid":"41","pname":"Video Touring","pchecked":false},{"pid":"100","pname":"Radio Margherita","pchecked":false},{"pid":"770","pname":"CAPRICCIO","pchecked":false},{"pid":"771","pname":"Ten","pchecked":false},{"pid":"772","pname":"CALABRIASONA","pchecked":false},{"pid":"773","pname":"Ten HD","pchecked":false},{"pid":"774","pname":"RTV","pchecked":false}],"tuner8":[{"pid":"1","pname":"Video Calabria","pchecked":false},{"pid":"2","pname":"eMEDICINA","pchecked":false},{"pid":"3","pname":"eFOOD","pchecked":false},{"pid":"11","pname":"Video Calabria HD","pchecked":false},{"pid":"22","pname":"ESPERIA TV","pchecked":false},{"pid":"23","pname":"ESPERIA TV +1","pchecked":false},{"pid":"31","pname":"TGCAL24.IT","pchecked":false},{"pid":"41","pname":"Video Touring","pchecked":false},{"pid":"100","pname":"Radio Margherita","pchecked":false},{"pid":"770","pname":"CAPRICCIO","pchecked":false},{"pid":"771","pname":"Ten","pchecked":false},{"pid":"772","pname":"CALABRIASONA","pchecked":false},{"pid":"773","pname":"Ten HD","pchecked":true},{"pid":"774","pname":"RTV","pchecked":false}]}';
            /*$config = '{
    "asi": [
      
    ],
    "ip": [
      
    ],
    "ip2": [
      
    ],
    "tuner1": [
      {
        "pid": "1",
        "pname": "CALABRIA TV",
        "pchecked": true
      },
      {
        "pid": "257",
        "pname": "TELESPAZIO TV",
        "pchecked": true
      },
      {
        "pid": "513",
        "pname": "MI SPOSO TV",
        "pchecked": true
      },
      {
        "pid": "515",
        "pname": "CALABRIA TV HD TEST",
        "pchecked": false
      },
      {
        "pid": "511",
        "pname": "TELESPAZIO TV HD TEST",
        "pchecked": false
      },
      {
        "pid": "41",
        "pname": "RADIO JUKEBOX",
        "pchecked": false
      },
      {
        "pid": "42",
        "pname": "RADIO RICORDI",
        "pchecked": false
      },
      {
        "pid": "44",
        "pname": "RADIO NEWS 24",
        "pchecked": false
      },
      {
        "pid": "2817",
        "pname": "LaC Tv",
        "pchecked": false
      },
      {
        "pid": "14",
        "pname": "MATRIX TV ITALIA",
        "pchecked": false
      }
    ],
    "tuner2": [
      {
        "pid": "1",
        "pname": "CALABRIA TV",
        "pchecked": true
      },
      {
        "pid": "2",
        "pname": "ESSE TV",
        "pchecked": true
      },
      {
        "pid": "8",
        "pname": "Tele Dehon",
        "pchecked": false
      },
      {
        "pid": "43",
        "pname": "RADIO ITALIANISSIMA",
        "pchecked": false
      },
      {
        "pid": "45",
        "pname": "RADIO ENNE LAMEZIA",
        "pchecked": false
      },
      {
        "pid": "47",
        "pname": "RADIO NEWS 24",
        "pchecked": false
      },
      {
        "pid": "48",
        "pname": "RADIO JUKEBOX",
        "pchecked": false
      },
      {
        "pid": "49",
        "pname": "RADIO RICORDI",
        "pchecked": false
      },
      {
        "pid": "112",
        "pname": "ESSE TV HD TEST",
        "pchecked": false
      },
      {
        "pid": "257",
        "pname": "TELESPAZIO TV",
        "pchecked": false
      },
      {
        "pid": "272",
        "pname": "Tele Dehon +1",
        "pchecked": false
      },
      {
        "pid": "513",
        "pname": "L\'altro Corriere TV",
        "pchecked": false
      },
      {
        "pid": "995",
        "pname": "TELESPAZIO TV HD TEST",
        "pchecked": false
      },
      {
        "pid": "996",
        "pname": "CALABRIA TV HD TEST",
        "pchecked": false
      },
      {
        "pid": "254",
        "pname": "LA GRANDE ITALIA",
        "pchecked": false
      },
      {
        "pid": "211",
        "pname": "L\'altro Corriere",
        "pchecked": false
      },
      {
        "pid": "1000",
        "pname": "PT - RADIO RICORDI TV",
        "pchecked": false
      },
      {
        "pid": "624",
        "pname": "TELESPAZIO TV FASHION",
        "pchecked": true
      },
      {
        "pid": "180",
        "pname": "RADIO JUKEBOX TV",
        "pchecked": false
      },
      {
        "pid": "190",
        "pname": "PLAY TV",
        "pchecked": true
      },
      {
        "pid": "247",
        "pname": "WCN - MARIAVISION",
        "pchecked": false
      },
      {
        "pid": "52",
        "pname": "LaC Tv",
        "pchecked": false
      },
      {
        "pid": "51",
        "pname": "LaC Tv HD",
        "pchecked": true
      },
      {
        "pid": "117",
        "pname": "TELE BRUZZANO JB",
        "pchecked": false
      }
    ],
    "tuner3": [
      
    ],
    "tuner4": [
      
    ],
    "tuner5": [
      
    ],
    "tuner6": [
      {
        "pid": "1",
        "pname": "Servizio OTA",
        "pchecked": false
      },
      {
        "pid": "99",
        "pname": "Ghost",
        "pchecked": false
      },
      {
        "pid": "1004",
        "pname": "Servizio4",
        "pchecked": false
      },
      {
        "pid": "1005",
        "pname": "Servizio5",
        "pchecked": false
      },
      {
        "pid": "1006",
        "pname": "Servizio6",
        "pchecked": false
      },
      {
        "pid": "1007",
        "pname": "Servizio7",
        "pchecked": false
      },
      {
        "pid": "1008",
        "pname": "Servizio8",
        "pchecked": false
      },
      {
        "pid": "1009",
        "pname": "Servizio9",
        "pchecked": false
      },
      {
        "pid": "1010",
        "pname": "Servizio10",
        "pchecked": false
      },
      {
        "pid": "1011",
        "pname": "Servizio11",
        "pchecked": false
      },
      {
        "pid": "1012",
        "pname": "Servizio12",
        "pchecked": false
      },
      {
        "pid": "4004",
        "pname": "Rete4",
        "pchecked": false
      },
      {
        "pid": "4005",
        "pname": "Canale5",
        "pchecked": false
      },
      {
        "pid": "4006",
        "pname": "Italia1",
        "pchecked": false
      },
      {
        "pid": "4013",
        "pname": "La 5",
        "pchecked": false
      },
      {
        "pid": "4014",
        "pname": "TGCOM24",
        "pchecked": true
      },
      {
        "pid": "4015",
        "pname": "Iris",
        "pchecked": false
      },
      {
        "pid": "4024",
        "pname": "Rete4",
        "pchecked": true
      },
      {
        "pid": "4025",
        "pname": "Canale5",
        "pchecked": true
      },
      {
        "pid": "4026",
        "pname": "Italia1",
        "pchecked": true
      },
      {
        "pid": "4105",
        "pname": "Mediaset Play",
        "pchecked": false
      },
      {
        "pid": "4113",
        "pname": "La 5",
        "pchecked": false
      },
      {
        "pid": "4114",
        "pname": "TGCOM24",
        "pchecked": false
      },
      {
        "pid": "4115",
        "pname": "Iris",
        "pchecked": false
      },
      {
        "pid": "4199",
        "pname": "Infinity",
        "pchecked": false
      },
      {
        "pid": "4200",
        "pname": "Test HEVC Main10",
        "pchecked": false
      }
    ],
    "tuner7": [
      {
        "pid": "1051",
        "pname": "Rai 3 HD",
        "pchecked": false
      },
      {
        "pid": "1052",
        "pname": "Rai 2 HD",
        "pchecked": false
      },
      {
        "pid": "1053",
        "pname": "Rai Sport",
        "pchecked": false
      },
      {
        "pid": "1054",
        "pname": "Rai Scuola",
        "pchecked": false
      },
      {
        "pid": "1055",
        "pname": "Rai Storia",
        "pchecked": false
      },
      {
        "pid": "1057",
        "pname": "Rai 5",
        "pchecked": false
      },
      {
        "pid": "1058",
        "pname": "RTV San Marino",
        "pchecked": false
      }
    ],
    "tuner8": [
      {
        "pid": "3401",
        "pname": "Rai 1",
        "pchecked": false
      },
      {
        "pid": "3402",
        "pname": "Rai 2",
        "pchecked": true
      },
      {
        "pid": "3403",
        "pname": "Rai 3 TGR Calabria",
        "pchecked": true
      },
      {
        "pid": "3404",
        "pname": "Rai Radio1",
        "pchecked": false
      },
      {
        "pid": "3405",
        "pname": "Rai Radio2",
        "pchecked": false
      },
      {
        "pid": "3406",
        "pname": "Rai Radio3",
        "pchecked": false
      },
      {
        "pid": "3411",
        "pname": "Rai News 24",
        "pchecked": true
      },
      {
        "pid": "3410",
        "pname": "Test HEVC main10",
        "pchecked": false
      }
    ]
  }';*/
            $res = TeracueApiManager::setRemuxProgramConfiguration($config);
            if($res["success"] == true) {
                sleep(1);
                $res = TeracueApiManager::setRemuxAsTSIPOutput();
                if($res["success"] == true) {
                    sleep(1);
                    $config1 = [ "iptv" => array_merge(...array_values(TeracueApiManager::getRemuxProgramConfiguration()["result"])) ];
                    $res = TeracueApiManager::setIPTVConfiguration(JsonHandler::encode($config1));
                }
            }
            return new DataResponse($res);
        } catch (Throwable $e) {
            return $this->handleException($e);
        }
    }


}
