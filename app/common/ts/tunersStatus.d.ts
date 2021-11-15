interface TunerBitrates {
 bitrate?: number;
 br_bitrate?: number;
 quality?: number;
}

interface TunerStatus {
 //status
 lock?: number;
 title?: string;
 total?: string;
 BER?: string;
 Strength?: string;
 Eb?: string;
 CN?: string;
 T2?: string;
 Pilot?: string;
 mod?: string;
 FFT?: string;
 GI?: string;
 FEC?: string;
 Bandwidth?: string;
 Constellation?: string;
 Ldpc?: string;
 L1?: string;
 Cell?: string;
 System?: string;
 Network?: string;
 bitrates?: TunerBitrates;
 configuration?: TunerConfig;
 programs?: Program[];
}

interface TunersStatus {
 tuners: TunersStatus[];
}

interface TunersStatusState {
 isLoading: Boolean;
 tuners: TunersStatus;
 error: null | TeracueError;
}

/**
* In case of Tuner after the api call the action will return a TeracueTunerSuccess
* @interface TeracueTunerSuccess
*/
interface TeracueTunerStatusSuccess {
 success: Boolean;
 result: TunersStatus;
 message?: String;
}

