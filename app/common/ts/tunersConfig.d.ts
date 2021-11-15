interface TunersConfigChangedState {
 changed: [string, Boolean] | {};
}

interface TunersConfigState {
 changed: TunersConfigChangedState;
 isLoading: Boolean;
 config: TunersConfig;
 error: null | TeracueError;
}

interface TunersConfig {
 tuners: TunerConfig[];
}

interface TunerConfig {
 //configurations
 tunerIndex?: number;
 tuner_type?: number;
 t2_tuner_signal_type?: number;
 qamfreq_c?: number;
 qamfreq_t?: number;
 qamfreq_t2?: number;
 tuner_t2_bandwidtha_ch106a?: number;
 tuner_t_bandwidtha_ch106a?: number;
 tuner_c_bandwidtha_ch106a?: number;
 plp_id_count?: number;
 tuner_muti_plp?: number;
}

interface TeracueTunerConfigSuccess {
 success: Boolean;
 result: TunersConfig;
 message?: String;
}

