import {
    icon
} from '@fortawesome/fontawesome-svg-core';
import {
    faInstagramSquare,
    faFacebookSquare
} from '@fortawesome/free-brands-svg-icons';

export const custom = (context) => {
    const container = context.shadowRoot.querySelector('.social-bar');
    const logos =  [icon(faFacebookSquare), icon(faInstagramSquare)];
    for(let i = 0; i < logos.length; i++) {
        const a = document.createElement('a');
        if(logos[i].iconName.includes('facebook')) {
            a.setAttribute('href', 'https://facebook.com');
            a.setAttribute('title', 'Some facebook account');
            a.setAttribute('rel', 'noreferrer noopener');
        }
        if(logos[i].iconName.includes('instagram')){
            a.setAttribute('href', 'https://www.instagram.com');
            a.setAttribute('title', 'Some instagram account');
            a.setAttribute('rel', 'noreferrer noopener');
        }
        a.appendChild(logos[i].node[0]);
        container.appendChild(a);
    }
};