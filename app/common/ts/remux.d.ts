
interface RemuxState {
  isLoading: Boolean;
  remux: Remux;
  error: null | TeracueError;
}

interface Program {
  /** pid is the id of the channel */
  pid: number;
  /** pchecked is a boolean defining if the channel is in output on the remux*/
  pchecked: boolean;
  /** pname is the name of the channel*/
  pname: string;
}

 interface RemuxTuners {
  /** Every Remux tuners consists in a list of Channels */
  tuner1: Program[];
  tuner2: Program[];
  tuner3: Program[];
  tuner4: Program[];
  tuner5: Program[];
  tuner6: Program[];
  tuner7: Program[];
  tuner8: Program[];
}

/**
 * Defines a Remux data type
 * @interface Remux
 *
 * @tuners {array} is a list of {@link RemuxTuners}
 */
 interface Remux {
  gigabit_ip_out_mode?: number;
  packet_size?: number;
  out_bitrate?: number;
  ts_id?: number;
  on_id?: number;
  tdt?: number;
  ca_remove?: number;
  mux_exit?: number;
  asi: any[];
  ip: any[];
  ip2: any[];
  /** A list of Remux tuners that cointains only info about the channels list of each tuner. */
  tuners: RemuxTuners;
}

/**
 * In case of success after the api call the action will return a TeracueRemuxSuccess
 * @interface TeracueRemuxSuccess
 *
 */
 interface TeracueRemuxSuccess {
  success: Boolean;
  result: Remux;
  message?: String;
}

