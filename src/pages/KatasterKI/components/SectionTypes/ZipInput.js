import React, { useRef, useState, useEffect } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';

import Flex from '~/components/Flex';
import Button from '~/pages/KatasterKI/components/Button';
import QuestionTitle from '~/pages/KatasterKI/components/QuestionTitle';
import Radio from '~/pages/KatasterKI/components/Radio';
import Input from '~/pages/KatasterKI/components/Input';
import useHandlerTimeout from '~/pages/KatasterKI/hooks/useHandlerTimeout';

const DistrictChooser = styled.div`
  width: 100%;
  max-width: 500px;
  margin: 10px auto 0 auto;
`;

const DistrictInfo = styled.div`
  font-size: 14px;
  margin: 0 0 15px 0;
  color: ${config.colors.midgrey};
`;

const DistrictWrapper = styled.div`
  display: flex;
  align-items: baseline;
  line-height: 1;
  margin-bottom: 10px;
  color: ${config.colors.darkbg};
`;

const DistrictLabel = styled.label`
  user-select: none;
`;

const isInvalidZipCode = (zip) =>
  zip.length !== 5 ||
  Number.isNaN(parseInt(zip, 10)) ||
  parseInt(zip, 10) < 1000;

const ZipInput = (props) => {
  // we need to remember zip and district locally so that we can always send both values
  // whether we change the zip or the district
  const zipCode = useRef(props.currentValue);
  const district = useRef(props.district);
  const [isButtonDisabled, setButtonDisabled] = useState(
    isInvalidZipCode(zipCode.current)
  );
  const [isLoading, onClick] = useHandlerTimeout(props.next);
  const hasDistrictOptions = !!(
    props.districtOptions && props.districtOptions.length
  );

  useEffect(() => {
    setButtonDisabled(
      isInvalidZipCode(zipCode.current) ||
        (hasDistrictOptions && !props.district)
    );
  }, [hasDistrictOptions, props.district]);

  const onChange = () => {
    const selectedDistrict = hasDistrictOptions ? district.current : '';

    setButtonDisabled(
      (hasDistrictOptions && !props.district) ||
        isInvalidZipCode(zipCode.current)
    );

    props.handleChange({
      zipcode: zipCode.current,
      district: selectedDistrict
    });
  };

  const onZipChange = (evt) => {
    zipCode.current = evt.target.value;
    onChange();
  };

  const onDistrictChange = (evt) => {
    district.current = evt.target.value;
    onChange();
  };

  return (
    <Flex flexDirection="column" css={{ flexGrow: 1 }}>
      <QuestionTitle>{props.title}</QuestionTitle>

      <Input
        type="text"
        placeholder="PLZ"
        onChange={onZipChange}
        value={props.currentValue}
      />

      {hasDistrictOptions && (
        <DistrictChooser>
          <DistrictInfo>
            Die Postleitzahl ist nicht eindeutig einem Bezirk zuzuordnen. Bitte
            wählen Sie den Ihnen zugehörigen Bezirk aus:
          </DistrictInfo>
          {props.districtOptions.map((option) => (
            <DistrictWrapper key={option}>
              <DistrictLabel htmlFor={option}>
                <Radio
                  type="radio"
                  name="district"
                  value={option}
                  id={option}
                  onChange={onDistrictChange}
                  checked={option === props.district}
                  css={{ marginRight: 10 }}
                />
                {option}
              </DistrictLabel>
            </DistrictWrapper>
          ))}
        </DistrictChooser>
      )}

      <Flex css={{ flexGrow: 1, marginTop: 20 }} justifyContent="center">
        <Button
          onClick={onClick}
          css={{ alignSelf: 'flex-end', width: '100%', maxWidth: 500 }}
          disabled={isButtonDisabled}
          isLoading={isLoading}
        >
          Weiter
        </Button>
      </Flex>
    </Flex>
  );
};

const mapStateToProps = (state) => ({
  districtOptions: state.KatasterKIState.districtOptions,
  district: state.KatasterKIState.profile.district
});

export default connect(mapStateToProps)(ZipInput);
