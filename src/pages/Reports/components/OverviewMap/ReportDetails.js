import React, { PureComponent } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { X } from 'react-feather';
import { media } from '~/styles/utils';
import ReportDetailsShape from '~/images/reports/report-details-shape.png';
import BikestandsIcon from '~/images/reports/bikestands-icon.svg';
import HeartIcon from '~/images/reports/heart.svg';
import ShareIcon from '~/images/reports/share.svg';

// TODO: split up in subcomponents (Topbar etc.) just like Reports/Landing


const centerBoxWithUnknownDims = `
 margin: auto;
 top:0;
 left:0;
 right:0;
 Bottom: 0;
`;

const boxShadow = 'box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.5);';

const Wrapper = styled.div`
  position: absolute;
  width: 100vw;
  height: 100vh;
  max-height: 100vh;
  z-index: 999999999999999;
  background-color: white;
  display: flex;
  flex-direction: column;
  ${media.m`
    width: 80%;
    height: 80%;
    ${centerBoxWithUnknownDims}
    border-radius: 4px;
    overflow:hidden;
    ${boxShadow}
  `}

  ${media.l`
    width: 50%;
    height: 50%;
    ${centerBoxWithUnknownDims}
    border-radius: 8px;
    overflow:hidden;
    ${boxShadow}
  `}
`;

const TopBar = styled.div`
  width: 100%;
  display: flex;
  padding: 10px 16px;
  min-height: 52px;
  background-color: ${config.colors.lightgrey};
`;

const CloseIcon = styled(X)`
  color: ${config.colors.black};
  cursor: pointer;
  margin: auto 0;
`;

const TopBarContent = styled.div`
  flex-grow: 2;
  margin-left: 24px;
`;

const TopBarIcon = styled.img`
  width: 26px;
  height: 31px;
`;

const Address = styled.p`
 font-size: 14px;
 color: ${config.colors.darkgrey};
 font-weight: 600;
 text-transform: uppercase;
 letter-spacing: 0.2px;
 margin: 0 0 3px;

`;

const ReportId = styled.p`
  color: #999999;
  font-size: 10px;
  line-height: 1.2;
  letter-spacing: 0.2px;
  margin: 0;
`;

const ReportImage = styled.img`
  width: 100%;
`;

const HeadlineSection = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px;
`;

// TODO: copied, de-dupe
const Heading = styled.h3`
  font-size: 22px;
  font-weight: bold;
  color: ${config.colors.black};
  line-height: 1.32;
  margin: 0;
`;

const BikeStandsCountSection = styled.div`
  margin-left: 16px;
`;

const BikeStandsCount = styled.p`
  margin-top: 4px;
  margin-bottom: 0;
  text-align: center;
  font-size: 10px;
  color: #999999;

`;

const Description = styled.p`
  padding: 16px;
  color: rgba(0, 0, 0, 0.54);
  line-height: 1.71;
  font-size: 14px;
  margin: 20px 0;
  flex:1;
   overflow:auto;
`;

const LikeSection = styled.div`
  width: 100%;
  height: 140px;
  background-color: ${config.colors.likebg};
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  padding: 20px;
`;

// using an invisible item to align the LikeButton in the middle and the share button right using justify-content: space-between;
const Fill = styled.div`
  width: 20%;
  height: 20%;
`;

const StyledHeartIcon = styled(HeartIcon)`
  display: block;
`;

// TODO: add functionality
const LikeButtonWrapper = styled.div`
  cursor: pointer;
`;

const LikeButton = styled.div`
  background-color: ${config.colors.interaction};
  width: 64px;
  height: 64px;
  border-radius: 50%;
  box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;

  margin: 0 auto;
`;

const LikeButtonCaption = styled.p`
  font-size: 10px;
  letter-spacing: 0.2px;
  color: ${config.colors.black};
  text-align: center;
  margin-bottom: 0;
`;

const ShareButtonWrapper = styled.div`
  cursor: pointer;
`;

const ShareButton = styled(ShareIcon)`
  display: block;
  cursor: pointer;
  margin: 0 25px 30px 25px;
`;


class ReportDetails extends PureComponent {
  static propTypes = {
    onClose: PropTypes.func.isRequired
  }

  /**
   * Removes zipcode and city
   * @param {string} address
   * @returns {string} Only street and number
   */
  formatAddressString = address => address
    .replace('Berlin', '')
    .replace(/\b\d{5}\b/g, '')
    .replace(',', '')
    .trim();

  /**
   * Shares Report using the Share API. TODO: discuss how a shared post looks like
   * Will only work when app is served over HTTPs https://developers.google.com/web/updates/2016/09/navigator-share
   * TODO: test
   */
  shareReport = () => {
    const { reportItem } = this.props;

    if (!navigator.share) {
      console.warn('Share API not present');
      return;
    }

    if (navigator.share) {
      navigator.share({
        title: `${reportItem.details.number} neue Fahrradbügel benötigt`,
        text: `${reportItem.description} Eine Meldung auf FixMyBerlin.`,
        url: window.location
      })
        .then(() => console.log('Successful share'))
        .catch(error => console.log('Error sharing', error)); // TODO: show error feedback
    }
  }

  render() {
    const {
      onClose,
      reports,
      match
    } = this.props;

    if (reports.length === 0) {
      return null;
    }

    const { reportId } = match.params;
    const report = reports.find(r => r.id === +reportId);
    const { address, photo, number, description } = report;

    return (
      <Wrapper>
        <TopBar>
          <TopBarIcon src={ReportDetailsShape} alt="Report Details" />
          <TopBarContent>
            <Address>
              {this.formatAddressString(address)}
            </Address>
            <ReportId>Meldung {reportId}</ReportId>
          </TopBarContent>
          <CloseIcon onClick={onClose} />
        </TopBar>

        {photo.src && (<ReportImage src={photo.src} />)}

        <HeadlineSection>
          <Heading>{number} neue Fahrradbügel benötigt</Heading>
          <BikeStandsCountSection>
            <BikestandsIcon />
            <BikeStandsCount>x{number}</BikeStandsCount>
          </BikeStandsCountSection>
        </HeadlineSection>
        <Description>{description}</Description>

        <LikeSection>
          <Fill />
          <LikeButtonWrapper>
            <LikeButton>
              <StyledHeartIcon />
            </LikeButton>
            <LikeButtonCaption>
              Unterstütze diese Meldung
            </LikeButtonCaption>
          </LikeButtonWrapper>
          <ShareButtonWrapper>
            <ShareButton onClick={this.shareReport} />
            <LikeButtonCaption>
              Teilen
            </LikeButtonCaption>
          </ShareButtonWrapper>
        </LikeSection>
      </Wrapper>
    );
  }
}

export default ReportDetails;
