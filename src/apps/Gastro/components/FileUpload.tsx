import { CircularProgress, FormHelperText } from '@material-ui/core';
import debug from 'debug';
import { ErrorMessage } from 'formik';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

import { AnchorButton } from '~/components2/Button';
import { DistrictConfig } from '~/types';

import api from '../api';
import config from '../config';
import FormError from './FormError';

const FileInputLabel = styled.label`
  // Separate button and label
  a {
    margin-top: 1em;
  }

  // Hide original form element (it's uggo)
  & > div:last-child {
    display: none;
  }
`;

const SelectedFile = styled.span`
  color: ${config.colors.change_4};
  font-weight: bold;
  display: block;
  margin-top: 1em;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const ButtonWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;

  a {
    margin-right: 1em;
  }
`;

const UploadError = styled(FormHelperText)`
  && {
    font-size: 1em;
    line-height: 1.5;
    margin-top: 1em;
  }
`;

const HiddenInput = styled.input`
  display: none;
`;

type Props = {
  accept?: string;
  handleChange: any;
  isSubmitting: boolean;
  name: string;
  values: any;
  district: DistrictConfig;
  labelChooseFile?: string;
  labelChangeFile?: string;
};

const logger = debug('fmc:components:FileUpload');

export const FileUpload: React.FC<Props> = ({
  accept = '.pdf',
  children,
  handleChange,
  isSubmitting,
  labelChooseFile = 'PDF auswählen',
  labelChangeFile = 'Neues PDF auswählen',
  name,
  values,
  district,
}) => {
  const [uploadingFile, setUploadingFile] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const uploadName = `${name}-S3`;
  const value = values[uploadName];

  useEffect(() => {
    const doSubmit = async () => {
      setUploadingFile(true);
      setError(null);

      let resp;
      try {
        resp = await api.uploadCertificate(values, district);
        handleChange({ target: { name: 'certificateS3', value: resp?.path } });
      } catch (e) {
        logger(e);
        setError(
          'Das Hochladen Ihrer Gewerbeanmeldung / Ihres Vereinsregisters ist fehlgeschlagen. Bitte prüfen Sie Ihre Internetverbindung und versuchen es erneut.'
        );
      }
      setUploadingFile(false);
    };
    if (values[name] != null) doSubmit();
  }, [values[name]?.name]);

  return (
    <FileInputLabel>
      <p>{children}</p>
      <ButtonWrapper>
        <AnchorButton
          flat
          disabled={isSubmitting || uploadingFile}
          aria-hidden="true"
          ghost={value != null}
        >
          {value == null && <>PDF auswählen</>}
          {value != null && <>Neues PDF auswählen</>}
        </AnchorButton>
        {uploadingFile && <CircularProgress />}
      </ButtonWrapper>

      {value != null && (
        <SelectedFile>
          Die gewählte Datei wurde Ihrem Antrag beigefügt.
        </SelectedFile>
      )}

      {error && <UploadError error>{error}</UploadError>}

      <ErrorMessage
        name={uploadName}
        render={(msg) => <FormError error>{msg}</FormError>}
      />

      <HiddenInput
        type="file"
        name={name}
        accept={accept}
        onChange={({ currentTarget: { files } }) =>
          handleChange({ target: { name, value: files[0] } })
        }
      />
    </FileInputLabel>
  );
};
