<?php
namespace OCA\CorecomDashboard\Settings;

use OCP\AppFramework\Http\TemplateResponse;
use OCP\BackgroundJob\IJobList;
use OCP\IConfig;
use OCP\IDateTimeFormatter;
use OCP\IL10N;
use OCP\Settings\ISettings;

use OCA\CorecomDashboard\Settings\SettingsManager;

class PersonalSettings implements ISettings {

    /** @var IConfig */
    private $config;

    /** @var IL10N */
    private $l;

    /** @var IDateTimeFormatter */
    private $dateTimeFormatter;

    /** @var IJobList */
    private $jobList;

    private $settingsManager;

    /**
     * Admin constructor.
     *
     * @param IConfig $config
     * @param IL10N $l
     * @param IDateTimeFormatter $dateTimeFormatter
     * @param IJobList $jobList
     */
    public function __construct(IConfig $config,
                                IL10N $l,
                                IDateTimeFormatter $dateTimeFormatter,
                                IJobList $jobList
    ) {
        $this->config = $config;
        $this->l = $l;
        $this->dateTimeFormatter = $dateTimeFormatter;
        $this->jobList = $jobList;
        $this->settingsManager = new SettingsManager();
    }

    /**
     * @return TemplateResponse
     */
    public function getForm() {

        /*$mapper = new SignEmailMapper(\OC::$server->getDatabaseConnection());
        try {
            $signEmail = $mapper->find(\OCP\User::getUser(), 0)->getEmail();
        } catch (\Throwable $e) {
            $signEmail = "";
        }

        $parameters = [
            'signEmail' => $signEmail
        ];*/

        return new TemplateResponse('corecomdashboard', 'personal_settings');
    }

    /**
     * @return string the section ID, e.g. 'sharing'
     */
    public function getSection() {
        return 'corecomdashboard';
    }

    /**
     * @return int whether the form should be rather on the top or bottom of
     * the admin section. The forms are arranged in ascending order of the
     * priority values. It is required to return a value between 0 and 100.
     */
    public function getPriority() {
        return 1;
    }

}
