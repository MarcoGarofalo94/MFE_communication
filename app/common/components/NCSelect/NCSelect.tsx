import axios from '@nextcloud/axios';
import { NCResponseError, Option, OptionsResponse } from '@store-app/types/options';
import { checkNCResponseError } from '@utils/errorHandling';
import React, { useEffect, useState } from 'react';

import classes from './NCSelect.module.css';
interface NcSelectProps {
  dataURL?: string;
  dataArray?: Option[];
  onSelectCallback: (key: number, option: Option) => any;
}

const NCSelect: React.FC<NcSelectProps> = ({
  dataArray = [],
  dataURL,
  onSelectCallback,
}) => {
  const [data, setData] = useState<Option[]>([]);
  const [error, setError] = useState<Error | null>();

  const onSelectHandler = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const optionValue = e.target.value;
    const key = data.findIndex((option) => option.value == optionValue);
    if (key >= 0) {
      onSelectCallback(key, data[key]);
    }
  };

  useEffect(() => {
    const fetchDataOptions = async () => {
      try {
        setError(null);
        const response = await axios.get<OptionsResponse & NCResponseError>(
          dataURL + ""
        );
        checkNCResponseError(response.data);
        setData([...response.data.result]);
      } catch (error) {
        setError(error);
      }
    };

    if (dataURL) {
      fetchDataOptions();
    } else {
      setData(dataArray);
    }
  }, [dataArray, dataURL]);

  if (error) {
    //TODO: add an error visualization
    OC.dialogs.alert("Something went wrong", "Error", () => console.log(error));
    return <></>;
  }

  return (
    <div className={[classes.row, classes.flexContainer].join(" ")}>
      <select className={classes.select} onChange={onSelectHandler}>
        {data.map((option, optionIndex) => (
          <option key={optionIndex} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default NCSelect;
