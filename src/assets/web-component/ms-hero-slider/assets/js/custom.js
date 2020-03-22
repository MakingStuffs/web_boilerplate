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
            a.setAttribute('href', 'https://www.facebook.com/La-Ares-693667351011043');
            a.setAttribute('title', 'La Ares on Facebook');
            a.setAttribute('rel', 'noreferrer noopener');
        }
        if(logos[i].iconName.includes('instagram')){
            a.setAttribute('href', 'https://www.instagram.com/ares.la');
            a.setAttribute('title', 'La Ares on Instagram');
            a.setAttribute('rel', 'noreferrer noopener');
        }
        a.appendChild(logos[i].node[0]);
        container.appendChild(a);
    }
};