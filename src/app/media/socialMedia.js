import React from "react";
import {FacebookShareButton, 
        FacebookIcon,
        TwitterShareButton,
        TwitterIcon,
        WhatsappShareButton,
        WhatsappIcon
        } 
from "react-share"

import './socialMedia.css'
       
export const SocialMediaButtons= (props) => {
    const highScoreShow = " My highest score is " + props.props.highScore + " points"
    const text = "CineQuiz - Are you a real movie buff ? \n" + highScoreShow + " \n Do you really think you can beat my SCORE?? Ahah"
    return (
        <div className="SocialMediaButtons">
            <FacebookShareButton
                url={"http://192.168.1.28:5000"}
                quote={text}
                hashtag="#cineQuiz"
                className="SocialMediaButtons-button"
            >
                <FacebookIcon size={36} />
            </FacebookShareButton>
            <TwitterShareButton
                url={"http://192.168.1.28:5000"}
                quote={text}
                hashtag="#cineQuiz"
                className="SocialMediaButtons-button"
                >
                <TwitterIcon size={36} />
            </TwitterShareButton>
            <WhatsappShareButton
                url={"http://192.168.1.28:5000"}
                quote={text}
                hashtag="#cineQuiz"
                className="SocialMediaButtons-button"
                >
                <WhatsappIcon size={36} />
            </WhatsappShareButton>
        </div>
    );
}
