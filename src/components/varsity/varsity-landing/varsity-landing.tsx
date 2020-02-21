import { Component, h, Prop, State, Listen } from '@stencil/core';
import { returnDate, removeParams, getNextEvents } from '../../../utils/utils';


@Component({
    tag: 'varsity-landing',
    styleUrl: 'varsity-landing.css',
    shadow: true
})
export class VarsityLanding {

    @Prop() year: string;
    @Prop() currentDate = returnDate(); 

    @State() eventsData;
    @State() scoreModalOpen = false;
    @State() upcomingModalOpen;

    componentDidLoad(){
        let url = `https://varsity-db.firebaseio.com/${this.year}.json`;
        fetch(url)
            .then(res => res.json())
            .then(data => {
                this.eventsData = data;
            })              
    }

    @Listen('exitModal') closeModal(){
        this.scoreModalOpen = false;
        this.upcomingModalOpen = false;
    }

    launchScores(e){
        e.preventDefault();
        console.log("Launched!");
        this.scoreModalOpen = true;
        console.log(this.scoreModalOpen);
    }

    renderLastScoreCard(){
        let evt = this.eventsData.filter(evt => evt.score).pop();
        return <label-card reverse cardtitle={evt.Title} image={removeParams(evt.ImageUrl)} text={`Kings ${evt.score[0]} : UCL ${evt.score[1]}`}></label-card>
    }

    renderScoreCardList(){
        let played = this.eventsData.filter(evt => evt.score);
    
        return played.map(evt => {
            return ([
                <div class="score-container">
                    <label-card cardtitle={evt.Title} reverse image={removeParams(evt.ImageUrl)} text={`Kings ${evt.score[0]} : UCL ${evt.score[1]}`}></label-card> 
                </div>
            ])
        })
    }

    // renderMatchList(){
    //     let data = this.getNextMatches();
    //     return <
    // }

    renderNextMatch(){
        let evt = getNextEvents(this.eventsData, 1)[0];
        return <label-card reverse buttonLink={evt.Url} buttonTitle="Find out more" cardtitle={evt.Title} image={removeParams(evt.ImageUrl)}></label-card>
    }
    
    render() {

        let data = this.eventsData;

        return (
            <div class="grid">
                <div class="verywide item">
                    <h2>London Varsity</h2>
                    <p>From March 8th, King's College London Students' Union (KCLSU Sports) and University College London Union (Team UCL) come together to go head-to-head in the hope of becoming this years' London Varsity Series champion. </p>
                </div>                
                
                <div class="wide item">
                    <span class="tilelabel">Next Match</span>
                    {this.renderNextMatch()}
                </div>  
                <div class="item wide">
                    <span class="tilelabel">Latest Score</span>
                    {this.renderLastScoreCard()}
                </div>
                <div class="item verywide">
                    <varsity-total-score scores={!data? '' : data.filter(evt => evt.score)}></varsity-total-score>
                </div>
                <div class="item wide">
                    <span class="tilelabel">Today's Weather</span>
                    <varsity-weather></varsity-weather>
                </div>
                <div class="item wide tall">
                    <span class="tilelabel">@KCLSU</span>

                </div>
                <div class="item wide vtall">
                    <span class="tilelabel">Upcoming</span>
                    <varsity-upcoming data={data}></varsity-upcoming>
                </div>
                <div class="item image">
                    Image
                </div>
                <div class="item image">
                   Image
                </div>
                <div class="item image">
                    <span class="tilelabel">All Scores</span>
                    <flex-container alignx="center" aligny="center" fillContainer>
                        <a class="button"onClick={(e) => this.launchScores(e)}>Click me</a>
                    </flex-container>
                    <kclsu-modal show={this.scoreModalOpen}>
                            {this.scoreModalOpen? this.renderScoreCardList() : ''}
                    </kclsu-modal>
                </div>
                <div class="item image">
                    <span class="tilelabel">Last Year's Scores</span>
                    <last-year-scores></last-year-scores>
                </div>
                <div class="item image">
                    Image
                </div>
                <div class="item verywide image">
                    Image
                </div>
            </div>
        );
    }
}