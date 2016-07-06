import { isEmpty, keys } from 'ramda';

// navStruct legend
// navStruct: {
//   'topLevelNavSection': {
//     'DropdownItemString': 'DropdownItemLocation',
//     ...
//   },
//   ...
// };

const navStruct = {
  'news': {
    'News': 'news_page',
    'Ingage Feed': 'ingage_feed',
    'Events': 'events',
    'Holidays': 'holidayspto',
    'Pictures': 'ingagepictures',
    'Community Engagement': 'engagement',
    'Community Wiki': 'community_wiki',
    'Ingage Day': 'ingageday',
  },
  'employeegrowth': {
    'Learning Portal': 'learning_portal',
    'Learning Wiki': 'learning_wiki',
  },
  'hr': {
    'Onboarding': 'onboarding',
    'Info and Links': 'info_links',
    'Founders': 'founders',
    'Admins': 'admins',
    'Management': 'management',
    'Support Team': 'support_team',
    'Consultants': 'consultants',
    'All Members': 'all_members',
  },
  'forum': {
    'General Help': 'help',
    'Report Issues/Bugs': 'bug',
    'Feedback': 'feedback',
  },

  // TODO: add paths to the following dropdown items
  'projects': {
    'Client Projects': '',
    'Client Project Archives': '',
    'Internal Projects': '',
    'Internal Project Archives': '',
  },
};

const externalLinks = {
  'employeegrowth': {
    'GRaD Plan': 'https://ingagepartners.peoplegoal.com/',
  },
};

const injectDropdowns = ($) => {
  const baseUrl = `${window.location.protocol}//${window.location.host}`;
  const topNavKeys = keys(navStruct);
  const extNavKeys = keys(externalLinks);

  // For each item in the primary nav bar...
  for (let i = 0; i < topNavKeys.length; ++i) {
    const navItem = topNavKeys[i];
    const navSel = `#nav-${navItem}`;

    $(navSel).addClass('top-nav');

    const childNavKeys = keys(navStruct[topNavKeys[i]]);

    let dropdown = '<ul class="nav-dropdown">\n';

    // For each subitem for a primary nav item
    for (let j = 0; j < childNavKeys.length; ++j) {
      let dropdownHref = `${baseUrl}/${topNavKeys[i]}/${navStruct[topNavKeys[i]][childNavKeys[j]]}`;
      dropdown += `<li class="nav-dropdown-item"><a href="${dropdownHref}">${childNavKeys[j]}</a></li>\n`;
    }

    dropdown += '</ul>';

    if (!isEmpty(navStruct[navItem])) {
      $(navSel).append(dropdown);
    }
  }

  for (let i = 0; i < extNavKeys.length; ++i) {
    const navItem = extNavKeys[i];
    const navSel = `#nav-${navItem}`;

    const childNavKeys = keys(externalLinks[navItem]);

    let linkEl = '';

    for (let j = 0; j < childNavKeys.length; ++j) {
      linkEl = `<li class="nav-dropdown-item"><a href="${externalLinks[navItem][childNavKeys[j]]}">${childNavKeys[j]}</a></li>`;
    }

    $(navSel + ' > ul.nav-dropdown').append(linkEl);
  }
};

const newTabLinks = ($) => {
  $('.new-tab a').each(function(index) {
    this.target = '_blank';
  });
};

module.exports = (($) => {
  $(window).unload(() => $('.nav-dropdown').remove());
  $(window).load(() => {
    injectDropdowns($);
    newTabLinks($);
  });
})(jQuery);
