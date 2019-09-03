import React, { PureComponent } from 'react';
import styled from 'styled-components';
import BikestandsIcon from '~/images/reports/bikestands-icon.svg';
import ShareIcon from '~/images/reports/share.svg';

import detailWrapped from '~/pages/Map/components/DetailView/detailWrapped';
import PlanningLike from '~/pages/Map/components/DetailView/PlanningDetail/PlanningLike';
import DetailFooter from '~/pages/Map/components/DetailView/DetailFooter';
import { getReportStatusCaption } from '~/pages/Reports/apiservice';

// TODO: split up in subcomponents (Topbar etc.) just like Reports/Landing

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100%;
`;

const Footer = styled(DetailFooter)`
  margin-top: auto;
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

const Hr = styled.hr`
  width: 100%;
  border: 1px solid ${config.colors.inactivegrey}
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
  overflow:auto;
`;

const IndicatorsWrapper = styled.div`
  margin-bottom: 1em;
`;

const IndicatorSection = styled.div`
  padding: 18px 16px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const IndicatorTitle = styled.p`
  margin: 0;
  padding: 0;
  font-size: 20px;
  font-weight: 300;
  line-height: 1.32;
  color: ${config.colors.black};
  flex-flow: 2;
`;

const BikeParkingIndicator = styled.div`
  flex-flow: 1;
  font-size: 14px;
  line-height: 1.71;
  text-align: center;
  color: rgba(0, 0, 0, 0.54);
  white-space: pre-wrap;
`;

// using an invisible item to align the LikeButton in the middle and the share button right using justify-content: space-between;
const Fill = styled.div`
  width: 20%;
  height: 20%;
`;

const LikeButtonCaption = styled.p`
  font-size: 11px;
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
        title: `${reportItem.details.number} neue Fahrradbügel gewünscht`,
        text: `${reportItem.description} Eine Meldung auf FixMyBerlin.`,
        url: window.location
      })
        .then(() => console.log('Successful share'))
        .catch(error => console.log('Error sharing', error)); // TODO: show error feedback
    }
  }

  render() {
    const { reportItem } = this.props;

    if (typeof reportItem === 'undefined') {
      return null;
    }

    const { photo, details, description, id, status } = reportItem;

    return (
      <Wrapper>
        {photo && photo.src && (<ReportImage src={photo.src} />)}

        <HeadlineSection>
          <Heading>{details.number} neue Fahrradbügel gewünscht</Heading>
          <BikeStandsCountSection>
            <BikestandsIcon />
            <BikeStandsCount>x{details.number}</BikeStandsCount>
          </BikeStandsCountSection>
        </HeadlineSection>

        {
          description && (
            <Description>{description}</Description>
          )
        }

        <IndicatorsWrapper>

          <IndicatorSection>
            <IndicatorTitle>Bedarf Fahrradparkhaus</IndicatorTitle>
            <BikeParkingIndicator>{
              details.fee ? `ja,
${details.fee} € / Tag` : 'nein'
            }
            </BikeParkingIndicator>
          </IndicatorSection>

          <Hr />

          <IndicatorSection>
            <IndicatorTitle>Status: {getReportStatusCaption(status)}</IndicatorTitle>
            {
              reportItem.status_reason && (
                <Description>{reportItem.status_reason}</Description>
              )
            }
          </IndicatorSection>

        </IndicatorsWrapper>

        <Footer>
          <Fill />
          <PlanningLike
            token={this.props.token}
            url={`${config.apiUrl}/reports/${id}`}
            id={id}
          />
          {navigator.share ? (
            <ShareButtonWrapper>
              <ShareButton onClick={this.shareReport} />
              <LikeButtonCaption>
                Teilen
              </LikeButtonCaption>
            </ShareButtonWrapper>
          ) : <Fill />}
        </Footer>
      </Wrapper>
    );
  }
}

export default detailWrapped(ReportDetails);
