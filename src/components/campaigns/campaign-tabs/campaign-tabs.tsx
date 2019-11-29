import { Component, h, Prop } from '@stencil/core';

@Component({
  tag: 'campaign-tabs',
  shadow: false
})

export class CampaignTabs {

@Prop() newsid: string;
@Prop() socials: string;

  render() {
    return (
        <page-content>
            <tabs-container>
                <h2>UPDATES</h2>
                <div>
                    <section class="col-md-6">
                        <div class="news cardBorder green container">
                            <div class="mobileView news_full">
                                <h3>Campaign News</h3>
                                <campaign-news newsid={this.newsid}></campaign-news>
                            </div>
                            <div class="buttonCTA purpleBorder arrow"><a href="/latest-news/">View all News</a></div>
                        </div>
                    </section>

                    <section class="col-md-6">
                        <h3>Social Media</h3>
                        <div class="social-col">
                            <div class="fb-group" data-href="" data-show-metadata="false" data-show-social-context="true" data-width="320">&nbsp;</div>
                        </div>
                    </section>
                </div>

                <h2>OVERVIEW</h2>
                <div>
                    <slot></slot>
                </div>

                <h2>HOW IT WORKS</h2>
                <div>
                    <h3>How do campaigns work?</h3>
                    <p>For a campaign to be officially supported by KCLSU, it needs to have the support of our student membership which is done through an online petition. Add your name to the petition to support the campaign.</p>
                    <p><em>To support this campaign as an association member, please update your eligibility on your voting profile.</em>&nbsp;You can find out more information about how to update your voting profile <a href="https://www.kclsu.org/elections/eligibilityexplained/">here</a></p>
                    <p>Campaigns need to be supported by <em>150 KCLSU members</em> to become a KCLSU supported campaign <em>or 75 Association members</em> to become a KCLSU Association Supported campaign.</p>
                    <p>Once the threshold is reached, it means the campaign will receive guidance and support from KCLSU staff to create a strategy and deliver the campaign aim. </p>
                    <p>To find out more about this campaign and how to get involved, be sure to&nbsp;join up!</p>
                </div>
                <h2>DOCUMENTS</h2>
                <div>
                    <h3>You must be logged in as a student to access the document below:</h3>
                    <primary-button to={this.socials}> Campaign Strategy Document </primary-button>
                </div>
            </tabs-container>
        </page-content>
    );
  }
}
