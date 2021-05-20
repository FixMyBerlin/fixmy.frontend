import React, { useEffect, useState } from 'react';

import { selectors } from '~/apps/Map/MapState';
import DetailSwitch, {
  ButtonGroup,
} from '~/apps/Map/components/DetailView/DetailSwitch';
import { BOTH_SIDES, LEFT_SIDE, RIGHT_SIDE } from '~/apps/Map/constants';
import { getOrientationNames } from '~/apps/Map/hbi-utils';
import { useTypedSelector } from '~/store';

import { BodyIntersection } from './BodyIntersection';
import { BodySection } from './BodySection';

const SectionDetail = () => {
  const data = useTypedSelector(({ MapState }) => MapState.hbiData);
  const [sideIndex, setSideIndex] = useState(LEFT_SIDE);

  if (data == null) return null;

  useEffect(() => {
    if (data.is_road === false && sideIndex !== BOTH_SIDES)
      setSideIndex(BOTH_SIDES);
  }, [data]);

  const hasSwitchButton = data.details && data.details.length > 1;
  const orientationNames = getOrientationNames(
    // @ts-ignore
    ...data.details.map((detail) => detail.orientation)
  );

  const hbi = useTypedSelector(selectors.getDetailsHBI);
  if (hbi == null) return null;

  return (
    <>
      {hasSwitchButton && (
        <ButtonGroup>
          <DetailSwitch
            activeSideIndex={sideIndex}
            sideIndex={LEFT_SIDE}
            title={orientationNames[LEFT_SIDE]}
            side="left"
            onClick={() => setSideIndex(LEFT_SIDE)}
          />
          <DetailSwitch
            activeSideIndex={sideIndex}
            sideIndex={RIGHT_SIDE}
            title={orientationNames[RIGHT_SIDE]}
            side="right"
            onClick={() => setSideIndex(RIGHT_SIDE)}
          />
        </ButtonGroup>
      )}

      {data.is_road ? (
        <BodySection
          sideIndex={sideIndex}
          orientationName={orientationNames[sideIndex]}
        />
      ) : (
        <BodyIntersection />
      )}
    </>
  );
};

export default SectionDetail;
