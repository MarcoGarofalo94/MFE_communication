<?php
namespace OCA\Customappaname1\Settings;

use OCP\IL10N;
use OCP\IURLGenerator;
use OCP\Settings\IIconSection;

class PersonalSection implements IIconSection {

    /** @var IL10N */
    private $l;

    /** @var IURLGenerator */
    private $urlGenerator;

    public function __construct(IL10N $l, IURLGenerator $urlGenerator) {
        $this->l = $l;
        $this->urlGenerator = $urlGenerator;
    }

    /**
     * returns the ID of the section. It is supposed to be a lower case string
     *
     * @returns string
     */
    public function getID() {
        return 'customappname1'; //or a generic id if feasible
    }

    /**
     * returns the translated name as it should be displayed, e.g. 'LDAP / AD
     * integration'. Use the L10N service to translate it.
     *
     * @return string
     */
    public function getName() {
        return $this->l->t('Customappname1');
    }

    /**
     * @return int whether the form should be rather on the top or bottom of
     * the settings navigation. The sections are arranged in ascending order of
     * the priority values. It is required to return a value between 0 and 99.
     */
    public function getPriority() {
        return 52;
    }

    /**
     * @return The relative path to a an icon describing the section
     */
    public function getIcon() {
        return $this->urlGenerator->imagePath('customappname1', 'app.svg');
    }

}
