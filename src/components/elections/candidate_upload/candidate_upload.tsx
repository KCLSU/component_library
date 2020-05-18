import { Component, h, Prop, State } from '@stencil/core';



@Component({
    tag: 'candidate-upload',
})
export class CandidateUpload {

    json: any = [{
        "Post": "President",
        "Last name": "NKNKNKNK",
        "First name": "CDSFDSFSADFAD",
        "ID / card number": "K4565466FGFD54",
        "Email address": "DSDWDW.FDFDA@.ac.uk",
        "Phone": 7821419435870,
        "Status": "Withdrawn",
        "Display name": "SADDWQDWQ CSACSADD",
        "Date nominated": "20/02/2016 11:51:33"
    }, {
        "Post": "President",
        "Last name": "TGERTGERF",
        "First name": "DFCDFE",
        "ID / card number": "5445757567",
        "Email address": "DFSEFEWFEFE@FDFEac.uk",
        "Phone": 7965456454892,
        "Status": "Approved",
        "Display name": "SCSACSD SCSACSACSACS",
        "Image": "View",
        "Date nominated": "22/02/2016 15:56:56"
    }, {
        "Post": "President",
        "Last name": "DFEWFEWF",
        "First name": "DWDWQ",
        "ID / card number": "DEWDWD45345435",
        "Email address": "aDW.grWDDWn@AAc.uk",
        "Phone": 7546767561492,
        "Status": "Withdrawn",
        "Display name": "WDQWDQ WDDWQDW",
        "Date nominated": 42676.68457175926
    }, {
        "Post": "President",
        "Last name": "CEWDFEWFDEW",
        "First name": "GHGFHGJ",
        "ID / card number": "H1433564576578",
        "Email address": "DWDWDW@gmail.com",
        "Phone": 7756565461,
        "Status": "Withdrawn",
        "Display name": "DWDWDW DWDWQDWQD",
        "Date nominated": 42676.960023148145
    }, {
        "Post": "President",
        "Last name": "HCEWFV",
        "First name": "CSCWQCQW",
        "Email address": "GHFGHGHGHH@kclsu.org",
        "Phone": 774364564566564,
        "Status": "Approved",
        "Display name": "DWDWQDW WDWQDWQD",
        "Image": "View",
        "Date nominated": "16/02/2016 21:07:34"
    }, {
        "Post": "President",
        "Last name": "CDCDWCDWC",
        "First name": "CEFEFEAS",
        "ID / card number": "K6576875855",
        "Email address": "FRFEFEWEg@..uk",
        "Phone": 4475656546468345543,
        "Status": "Withdrawn",
        "Display name": "WCSCWEDCW WDWWQD",
        "Date nominated": "20/02/2016 16:01:45"
    },{
        "Post": "Vice President Activities and Development",
        "Last name": "DSDCFDSCDSC",
        "First name": "CDSCDSCDS",
        "ID / card number": "K4543554654",
        "Email address": "VSDFVDSFDFLLmail.com",
        "Phone": 7477656456453335,
        "Status": "Approved",
        "Display name": "DWEDWQD DWDWQDW",
        "Image": "View",
        "Date nominated": "22/02/2016 15:15:56"
    }];

    /** The JSON generated from the browser-side uploaded excel spreadsheet */
    @Prop() spreadsheetData:any;
    /** Either 'candidates' or 'results'. Will set the firebase url and key map */
    @Prop() stage: string;

    @State() successfulUpload = false;
    @State() error = '';
    @State() modalOpen = false;

    candidatesKeysMap = {
        'Display name': 'Name',
        'Post': 'Post',
        'Manifesto': 'ManifestoLink',
        'Image': 'ImageLink'
    }

    resultsKeysMap = {
        'Elected Candidate': 'Name',
        'Post title': 'Post',
        'Manifesto': 'ManifestoLink',
        'Image': 'ImageLink'
    }

    submitJson(){
        let url;
        if (this.stage === 'candidates') url='';
        else if (this.stage === 'results') url = '';
        else {console.log('No stage param specified')}

        const payload = this.json.map(ob => {
            return this.reBuildObject(this.candidatesKeysMap, ob)
        });

        const body: any = {
            method: 'PUT', 
            body: JSON.stringify(payload) 
        };

    fetch(url, body)
        .then(res => {
            if (res.status){
                this.error = '';
                this.successfulUpload = true;
            }
        })
        .catch(er => this.error = er); 
    }


    reBuildObject(keyMap, obj){
        return Object.keys(obj).reduce((acc, key) => {
            if(!keyMap[key]){
                return {...acc}
            }
            else {
                return ({
                    ...acc,
                    ...{[keyMap[key]]: obj[key]}
                })
            }
            },
        {})
    }

    createCards(data){
        return data.map(candidate =>{ 
            return <profile-card 
                       name={candidate.Name.toLowerCase()}
                       position={candidate.Post}
                       link={''}
                       image={candidate.ImageLink? candidate.ImageLink : 'https://res.cloudinary.com/kclsu-media/image/upload/f_auto,fl_any_format,g_center,q_100/v1581516201/website_uploads/KCLSU%20Brand/Bzcl1r6L_400x400_se7grm.jpg'} 
                       cta='Manifesto'
                       secondcta = 'Breakdown'
                       secondlink = {candidate.ResultsLink}
                   />
       })
    }
    
    render() {
        
        const data = this.json.map(ob => {
            return this.reBuildObject(this.candidatesKeysMap, ob)
        });

        const cards = (
            <profile-card-layout>
                {this.createCards(data)}
            </profile-card-layout>
        ) 


        return cards 
        // return this.spreadsheetData && cards 
    }
}