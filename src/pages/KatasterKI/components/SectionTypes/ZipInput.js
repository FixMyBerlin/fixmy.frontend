import React, { useRef, useState } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';

import Flex from '~/components/Flex';
import Button from '~/pages/KatasterKI/components/Button';
import QuestionTitle from '~/pages/KatasterKI/components/QuestionTitle';
import Radio from '~/pages/KatasterKI/components/Radio';

const Input = styled.input`
  border: none;
  border-bottom: 1px solid ${config.colors.inactivegrey};
  font-size: 24px;

  &:focus {
    outline: none;
    border-bottom-color: ${config.colors.katasterHighlight};
  }
`;

const DistrictChooser = styled.div`
  margin-top: 10px;
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

const DistrictInput = styled.input`
  margin-right: 10px;
`;

const DistrictLabel = styled.label`
  user-select: none;
`;

const ZipInput = (props) => {
  // we need to remember zip and district locally so that we can always send both values
  // whether we change the zip or the district
  const zipCode = useRef(props.currentValue);
  const district = useRef(props.district);
  const [isButtonDisabled, setButtonDisabled] = useState(true);

  const hasDistrictOptions = !!(
    props.districtOptions && props.districtOptions.length
  );

  const onChange = () => {
    const selectedDistrict = hasDistrictOptions ? district.current : null;

    const isInvalidZipCode =
      zipCode.current.length === 0 ||
      Number.isNaN(parseInt(zipCode.current, 10)) ||
      parseInt(zipCode.current, 10) < 1000;

    setButtonDisabled(
      (hasDistrictOptions && props.district == null) || isInvalidZipCode
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

      <Flex css={{ flexGrow: 1 }} justifyContent="center">
        <Button
          onClick={props.next}
          css={{ alignSelf: 'flex-end' }}
          disabled={isButtonDisabled}
        >
          weiter
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
