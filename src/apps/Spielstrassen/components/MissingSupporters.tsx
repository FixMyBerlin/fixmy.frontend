import React from 'react';
import slugify from 'slugify';
import { generatePath } from 'react-router-dom';
import Link from '~/components2/Link';
import Notice from '~/components2/Notice';
import config from '~/config';
import { Spielstrasse } from '../types';

const interSperse = (elems, sep = ', ', lastSep = ' und ') => {
  const sepElem = <>{sep}</>;
  const lastSepElem = <>{lastSep}</>;
  const lastSepAt = elems.length - 2;

  return elems
    .slice(1)
    .reduce(
      (prev, cur, i) =>
        prev.concat([i === lastSepAt ? lastSepElem : sepElem, cur]),
      [elems[0]]
    );
};

const MissingSupportersNotice = ({
  streets,
  supporterGoal,
}: {
  streets: Spielstrasse[];
  supporterGoal: number;
}) => {
  const highlightedStreets = streets
    .filter((street) => street.supporters < supporterGoal)
    .map(({ street }) => {
      const signupUrl = generatePath(config.routes.spielstrassen.register, {
        slug: slugify(street, { lower: true }),
      });
      return (
        <Link internal href={signupUrl} key={signupUrl}>
          {street}
        </Link>
      );
    });
  if (highlightedStreets.length === 0) return null;

  const interspersedElems = interSperse(highlightedStreets);

  return (
    <Notice>
      Die Spielstraße{interspersedElems.length === 1 ? '' : 'n'}{' '}
      {interspersedElems} {interspersedElems.length === 1 ? 'hat' : 'haben'} die
      Mindestzahl an Kiezlots:innen noch nicht erreicht.
    </Notice>
  );
};

export default MissingSupportersNotice;
