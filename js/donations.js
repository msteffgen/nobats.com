document.addEventListener('DOMContentLoaded', function() {
  const decadeFilters = document.querySelectorAll('.decade-filter');
  const donationCards = document.querySelectorAll('.donation-card, .donation-card-2022');
  
  decadeFilters.forEach(filter => {
    filter.addEventListener('click', function() {
      const decade = this.dataset.decade;
      
      // Remove active class from all filters
      decadeFilters.forEach(f => f.classList.remove('active'));
      
      // Add active class to clicked filter
      this.classList.add('active');
      
      // Show/hide cards based on decade
      donationCards.forEach(card => {
        const cardDecade = card.dataset.decade;
        if (decade === 'all' || cardDecade === decade) {
          card.style.display = '';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });
});

// Modal functionality
function openCharityModal(year) {
  // Prevent any default behavior
  event.preventDefault();
  event.stopPropagation();
  
  const modal = document.getElementById('charityModal');
  const modalTitle = document.getElementById('modalTitle');
  const modalYear = document.getElementById('modalYear');
  const modalCharities = document.getElementById('modalCharities');
  
  // Set modal title and year
  modalTitle.textContent = `${year} Donations`;
  modalYear.textContent = `Total Raised: ${getTotalForYear(year)}`;
  
  // Get charity data for the year
  const charityData = getCharityDataForYear(year);
  
  // Build modal content
  modalCharities.innerHTML = charityData.map(charity => {
    // Handle multiple amounts or single amount
    const amountDisplay = charity.amounts 
      ? charity.amounts.map(item => `<div class="charity-modal-amount-item"><span class="charity-modal-amount-label">${item.label}</span><span class="charity-modal-amount-value">${item.amount}</span></div>`).join('')
      : `<div class="charity-modal-amount">${charity.amount}</div>`;
    
    return `
      <div class="charity-modal-item">
        <div class="charity-modal-logo">
          <img src="${charity.logo}" alt="${charity.name}">
        </div>
        <div class="charity-modal-info">
          <div class="charity-modal-name">${charity.name}</div>
          ${amountDisplay}
          <div class="charity-modal-description">${charity.description}</div>
          ${charity.link ? `<a href="${charity.link}" target="_blank" class="charity-modal-link">Learn More →</a>` : ''}
        </div>
      </div>
    `;
  }).join('');
  
  modal.style.display = 'block';
  
  // Scroll modal content to top
  const modalContent = modal.querySelector('.charity-modal-content');
  modalContent.scrollTop = 0;
  
  // Prevent body scroll when modal is open
  document.body.style.overflow = 'hidden';
  
  return false;
}

function closeCharityModal() {
  document.getElementById('charityModal').style.display = 'none';
  
  // Restore body scroll when modal is closed
  document.body.style.overflow = '';
}

function getTotalForYear(year) {
  const yearCards = {
    '2024': '$75,000',
    '2023': '$8,100',
    '2022': '$121,310',
    '2021': '$125,000',
    '2020': '$37,642',
    '2019': '$226,100',
    '2018': '$71,000',
    '2017': '$15,000',
    '2016': '$62,000',
    '2015': '$70,500',
    '2014': '$144,000',
    '2013': '$84,050',
    '2012': '$101,330',
    '2011': '$89,945',
    '2010': '$68,700',
    '2009': '$431,750',
    '2008': '$58,510',
    '2007': '$57,285',
    '2006': '$34,700',
    '2005': '$2,000',
    '2004': '$71,581',
    '2003': '$74,523',
    '2002': '$123,300',
    '2001': '$84,357',
    '2000': '$36,368',
    '1999': '$38,500',
    '1998': '$21,914',
    '1997': '$1,000'
  };
  return yearCards[year] || '$0';
}

function getCharityDataForYear(year) {
  const charityData = {
    '2024': [
      {
        name: 'Bananas Foster',
        amount: '$75,000',
        description: 'Bananas Foster is a 501(c)(3) nonprofit Bringing Families Together by celebrating the foster care community, while educating and inspiring others to get involved.',
        logo: 'img/charities/bananas_foster.png',
        link: 'https://bananasfoster.org/'
      }
    ],
    '2023': [
      {
        name: 'Marine Corps Scholarship Fund',
        amount: '$7,500',
        description: 'The privately-funded, non-profit organization provides scholarships for post-high school education and career training to all qualified deserving sons and daughters of Marines and Navy Corpsmen with particular attention given to children whose parent has been killed or wounded in action and those who have demonstrated financial need.',
        logo: 'img/charities/marine_corps_scholarship_fund.png',
        link: 'https://www.mcsf.org'
      },
      {
        name: 'Junior Junkanoo',
        amount: '$600',
        description: 'The Junior Junkanoo Program was designed to bring together young people through workshops, seminars and summer programmes, to be taught the fundamentals of Junkanoo design, Music, Costuming and Dance, and to instruct and assist organizers, participants and Judges in further devaluing the art of Junkanoo in New Providence and the Family Island.',
        logo: 'img/charities/jr_junkanoo.jpg',
        link: ''
      }
    ],
    '2022': [
      {
        name: 'Sox Charities',
        amount: '$90,000',
        description: 'Chicago White Sox Charities (CWSC) works tirelessly to lift up those most in need throughout the Chicagoland area. CWSC raises funds to promote youth education and advancement, share the love of the game through youth baseball initiatives, assist children and families in crisis and champion those battling cancer.',
        logo: 'img/charities/sox_charities.jpg',
        link: 'https://www.mlb.com/whitesox/charities'
      },
      {
        name: 'Orioles Advocates',
        amount: '$18,310',
        description: 'The Oriole Advocates are a group of diverse individuals from all walks of life with one thing in common: a love for the game of baseball. Through their Cardboard to Leather program, they collect baseball equipment that would otherwise be discarded and send it to countries where there is a real love for the game but lack of equipment to play it. No Bats was grateful for the opportunity to initiate and facilitate the Advocates\' generous uniform and equipment donations to the youth of Bimini. The Advocates\' kindness assures that every boy and girl on this small Bahamian island (population 1,988) who wishes to play now has that wonderful opportunity.',
        logo: 'img/charities/oriole_advocates.jpg',
        link: 'http://www.orioleadvocates.org/'
      },
      {
        name: 'Marine Corps Scholarship Fund',
        amount: '$7,500',
        description: 'The privately-funded, non-profit organization provides scholarships for post-high school education and career training to all qualified deserving sons and daughters of Marines and Navy Corpsmen with particular attention given to children whose parent has been killed or wounded in action and those who have demonstrated financial need.The privately-funded, non-profit organization provides scholarships for post-high school education and career training to all qualified deserving sons and daughters of Marines and Navy Corpsmen.',
        logo: 'img/charities/marine_corps_scholarship_fund.png',
        link: 'https://www.mcsf.org'
      },
      {
        name: 'Once In A Lifetime',
        amount: '$500',
        description: 'Operation Once in a Lifetime\'s mission is to make the dreams of our U.S. Service Members and their families come true by providing once in a lifetime experiences for our military as well as emergency financial assistance through our multiple programs.',
        logo: 'img/charities/once_in_a_lifetime.png',
        link: 'https://operationonceinalifetime.com/'
      }
    ],
    '2021': [
      {
        name: 'Nolan Ryan Foundation',
        amount: '$125,000',
        description: 'The Nolan Ryan Foundation, a 501(c)(3) nonprofit organization, was formed in Alvin, Texas in 1990. Nolan and Ruth generously give their time for signing and other fund-raising efforts that enable the Foundation to provide resources for youth, education, and community development.',
        logo: 'img/charities/nolan_ryan_foundation.png',
        link: 'https://www.nolanryanfoundation.org'
      }
    ],
    '2020': [
      {
        name: 'Marine Corps Scholarship Fund',
        amount: '$26,000',
        description: 'The privately-funded, non-profit organization provides scholarships for post-high school education and career training to all qualified deserving sons and daughters of Marines and Navy Corpsmen with particular attention given to children whose parent has been killed or wounded in action and those who have demonstrated financial need.',
        logo: 'img/charities/marine_corps_scholarship_fund.png',
        link: 'https://www.mcsf.org'
      },
      {
        name: 'Bimini Youth Development Foundation',
        amount: '$8,642',
        description: 'No Bats contributed to the Bimini Baseball Field Restoration Project which helped restore the islands baseball fields after it was destroyed by multiple hurricanes.',
        logo: 'img/charities/bimini.jpg',
        link: 'https://www.bahamas.com/islands/bimini'
      },
      {
        name: 'Special Operations Warrior Foundation',
        amount: '$3,000',
        description: 'Special Operations Warrior Foundation pledges to ensure full college funding to every surviving child of a special operator who loses their life in the line of duty.',
        logo: 'img/charities/special_operations_warrior_foundation.jpg',
        link: 'https://specialops.org'
      }
    ],
    '2019': [
      {
        name: 'Nashville Sounds Foundation',
        amount: '$70,000',
        description: 'The mission of the Nashville Sounds Foundation is to utilize baseball to positively impact communities throughout Middle Tennessee by emphasizing the importance of social responsibility, education, and the power of sport to transform lives.',
        logo: 'img/charities/nashville_sounds_foundation.jpg',
        link: 'https://www.milb.com/nashville/community'
      },
      {
        name: 'Continuing Contributions',
        amount: '$96,100',
        description: 'Since 1997, members of the No Bats Baseball Club have continued to give annual contributions to various charities that the Club has supported. This is a summary of those donations over the past several years.',
        logo: 'img/charities/nbbclogo.png',
        link: ''
      },
      {
        name: 'Folds of Honor Foundation',
        amount: '$10,000',
        description: 'Members of the No Bats Baseball Club have contributed to the Folds of Honor Foundation for several years.',
        logo: 'img/charities/folds_of_honor_foundation.png',
        link: 'https://www.foldsofhonor.org'
      },
      {
        name: 'Pat Darby Hope Garden',
        amount: '$50,000',
        description: 'Donated on behalf of the club in loving memory of Pat Darby.',
        logo: 'img/charities/pat_darby_hope_garden.jpg',
        link: ''
      }
    ],
    '2018': [
      {
        name: 'Reds Community Fund',
        amount: '$71,000',
        description: 'The Reds Community Fund is dedicated to improving the lives of youth by leveraging the tradition of the Cincinnati Reds and the game of baseball.',
        logo: 'img/charities/reds_community_fund.png',
        link: 'https://www.mlb.com/reds/community'
      }
    ],
    '2017': [
      {
        name: 'Anthony Rizzo Foundation',
        amount: '$15,000',
        description: 'The mission of the Anthony Rizzo Family Foundation is to raise money for cancer research and to provide support to children and their families battling the disease.',
        logo: 'img/charities/anthony_rizzo_foundation.jpg',
        link: 'https://rizzo44.com'
      }
    ],
    '2016': [
      {
        name: 'Jim "Catfish" Hunter ALS Foundation',
        amount: '$62,000',
        description: 'The mission of the Jim "Catfish" Hunter ALS Foundation is to assist patients and caregivers, thereby easing the burden of ALS and improving quality of life.',
        logo: 'img/charities/jim_catfish_hunter_foundation.png',
        link: 'http://www.catfishfoundation.org'
      }
    ],
    '2015': [
      {
        name: 'Marlins Charities RBI Program',
        amount: '$70,500',
        description: 'RBI is a Major League Baseball youth outreach program designed to: Increase participation and interest in baseball and softball among underserved youth; Encourage academic participation and achievement; Increase number of talented athletes prepared to play in college and minor leagues; Promote greater inclusion of minorities into the mainstream of the game; Teach the value of teamwork.',
        logo: 'img/charities/rbi.png',
        link: 'https://www.mlb.com/marlins/community/rbi'
      }
    ],
    '2014': [
      {
        name: 'Cubs Charities RBI Program',
        amounts: [
          { label: 'Cubs Charities RBI Program', amount: '$96,000' },
          { label: 'McCormick Trust 50% Matching Funds', amount: '$48,000' }
        ],
        description: 'RBI is a Major League Baseball youth outreach program designed to: Increase participation and interest in baseball and softball among underserved youth; Encourage academic participation and achievement; Increase number of talented athletes prepared to play in college and minor leagues; Promote greater inclusion of minorities into the mainstream of the game; Teach the value of teamwork.',
        logo: 'img/charities/rbi.png',
        link: 'https://www.mlb.com/cubs/community/cubs-charities/cubs-rbi'
      }
    ],
    '2013': [
      {
        name: 'Marine Corps Scholarship Fund',
        amount: '$74,000',
        description: 'The privately-funded, non-profit organization provides scholarships for post-high school education and career training to all qualified deserving sons and daughters of Marines and Navy Corpsmen with particular attention given to children whose parent has been killed or wounded in action and those who have demonstrated financial need.',
        logo: 'img/charities/marine_corps_scholarship_fund.png',
        link: 'https://www.mcsf.org'
      },
      {
        name: 'Cafe Reconcile',
        amount: '$10,050',
        description: 'Cafe Reconcile is a non-profit restaurant that uses innovative strategies to provide life skills and job training to youth from at-risk communities in the New Orleans area.',
        logo: 'img/charities/cafe_reconcile.png',
        link: 'https://www.cafereconcile.org'
      }
    ],
    '2012': [
      {
        name: 'Canine Companions For Independence',
        amount: '$62,330',
        description: 'Founded in 1975, Canine Companions for Independence (CCI) is a non-profit organization that enhances the lives of people with disabilities by providing highly trained assistance dogs and ongoing support to ensure quality partnerships.',
        logo: 'img/charities/canine_companions.png',
        link: 'https://www.cci.org'
      },
      {
        name: 'Marine Corps Scholarship Fund',
        amount: '$25,000',
        description: 'The privately-funded, non-profit organization provides scholarships for post-high school education and career training to all qualified deserving sons and daughters of Marines and Navy Corpsmen with particular attention given to children whose parent has been killed or wounded in action and those who have demonstrated financial need.',
        logo: 'img/charities/marine_corps_scholarship_fund.png',
        link: 'https://www.mcsf.org'
      },
      {
        name: 'Jim "Catfish" Hunter ALS Foundation',
        amount: '$14,000',
        description: 'The mission of the Jim "Catfish" Hunter ALS Foundation is to assist patients and caregivers, thereby easing the burden of ALS and improving quality of life.',
        logo: 'img/charities/jim_catfish_hunter_foundation.png',
        link: 'http://www.catfishfoundation.org'
      }
    ],
    '2011': [
      {
        name: 'Susan G. Komen Foundation',
        amount: '$87,220',
        description: 'Nancy G. Brinker promised her dying sister, Susan G. Komen, she would do everything in her power to end breast cancer forever. In 1982, that promise became Susan G. Komen for the Cure and launched the global breast cancer movement.',
        logo: 'img/charities/susan_g_komen.png',
        link: 'https://www.komen.org'
      },
      {
        name: 'Wounded Warriors - Disabled Sports',
        amount: '$1,000',
        description: 'Disabled Sports USA\'s mission is to provide national leadership and opportunities for individuals with disabilities to develop independence, confidence, and fitness through participation in community sports, recreation and educational programs.',
        logo: 'img/charities/disabled_sports_usa.png',
        link: 'http://www.disabledsportsusa.org'
      },
      {
        name: 'Family of Shannon Stone',
        amount: '$1,000',
        description: 'Shannon was a fan who died during a Texas Rangers game while trying to catch a foul ball.',
        logo: 'img/charities/nbbclogo.png',
        link: ''
      },
      {
        name: 'Plano Baseball Association',
        amount: '$725',
        description: 'PBA, a non-profit organization, hosts both recreational and competitive baseball and softball for youth in Plano and the surrounding communities.',
        logo: 'img/charities/plano_baseball_association.png',
        link: ''
      }
    ],
    '2010': [
      {
        name: 'Memphis Redbirds Foundation',
        amount: '$67,000',
        description: 'The not-for-profit Memphis Redbirds Baseball Foundation uses its funds to enable children to participate in sports across the Memphis area through programs like RBI and STRIPES.',
        logo: 'img/charities/memphis_redbirds_foundation.jpg',
        link: 'https://www.milb.com/memphis/community/redbirds-community-fund'
      },
      {
        name: 'Wounded Warriors - Disabled Sports',
        amount: '$1,000',
        description: 'Disabled Sports USA\'s mission is to provide national leadership and opportunities for individuals with disabilities to develop independence, confidence, and fitness through participation in community sports, recreation and educational programs.',
        logo: 'img/charities/disabled_sports_usa.png',
        link: 'http://www.disabledsportsusa.org'
      },
      {
        name: 'Plano Baseball Association',
        amount: '$700',
        description: 'PBA, a non-profit organization, hosts both recreational and competitive baseball and softball for youth in Plano and the surrounding communities.',
        logo: 'img/charities/plano_baseball_association.png',
        link: ''
      }
    ],
    '2009': [
      {
        name: 'Wounded Warriors - Disabled Sports',
        amounts: [
          { label: 'Wounded Warriors - Disabled Sports', amount: '$105,000' },
          { label: 'Land Donation from Bryan Brown of Paragon Services Inc.', amount: '$326,000' }
        ],
        description: 'Disabled Sports USA\'s mission is to provide national leadership and opportunities for individuals with disabilities to develop independence, confidence, and fitness through participation in community sports, recreation and educational programs.',
        logo: 'img/charities/disabled_sports_usa.png',
        link: 'http://www.disabledsportsusa.org'
      },
      {
        name: 'Plano Baseball Association',
        amount: '$750',
        description: 'PBA, a non-profit organization, hosts both recreational and competitive baseball and softball for youth in Plano and the surrounding communities.',
        logo: 'img/charities/plano_baseball_association.png',
        link: ''
      }
    ],
    '2008': [
      {
        name: 'Tony & Alicia Gwynn Foundation',
        amount: '$54,670',
        description: 'The Tony and Alicia Gwynn Foundation (TAG) is dedicated to creating and supporting programs that enhance opportunities for youth to become healthy, educated, and productive citizens.',
        logo: 'img/charities/tony_gwynn_foundation.jpg',
        link: 'https://thetonyandaliciagwynn.foundation/'
      },
      {
        name: 'Plano Baseball Association',
        amount: '$3,840',
        description: 'PBA, a non-profit organization, hosts both recreational and competitive baseball and softball for youth in Plano and the surrounding communities.',
        logo: 'img/charities/plano_baseball_association.png',
        link: ''
      }
    ],
    '2007': [
      {
        name: 'Miracle League',
        amount: '$53,245',
        description: 'Miracle League donations assist in the building of a new Miracle League field in association with the Corpus Christi Hooks. The Miracle League has two objectives: Raise the funds necessary to build a special complex with facilities that meet the unique needs of the Miracle League players; Assist in the outreach efforts for Miracle Leagues across the country.',
        logo: 'img/charities/miracle_league.png',
        link: 'https://www.miracleleague.com/'
      },
      {
        name: 'Nolan Ryan Foundation',
        amount: '$2,160',
        description: 'The Nolan Ryan Foundation, a 501(c)(3) nonprofit organization, was formed in Alvin, Texas in 1990. Nolan and Ruth generously give their time for signing and other fund-raising efforts that enable the Foundation to provide resources for youth, education, and community development.',
        logo: 'img/charities/nolan_ryan_foundation.png',
        link: 'https://www.nolanryanfoundation.org'
      },
      {
        name: 'Plano Baseball Association',
        amount: '$1,880',
        description: 'PBA, a non-profit organization, hosts both recreational and competitive baseball and softball for youth in Plano and the surrounding communities.',
        logo: 'img/charities/plano_baseball_association.png',
        link: ''
      }
    ],
    '2006': [
      {
        name: 'Bimini, Bahamas',
        amount: '$20,000',
        description: 'Donation of computers, software, wireless networks and peripherals to the island schools.',
        logo: 'img/charities/bimini.jpg',
        link: 'https://www.bahamas.com/islands/bimini'
      },
      {
        name: 'Ron Kittle\'s Indiana Sports Charities',
        amount: '$12,000',
        description: 'Indiana Sports Charities (ISC) was founded in 1989 by Ron Kittle. Ron and his volunteer staff are dedicated to assisting cancer research facilities and education institutions throughout Chicagoland and Northwest Indiana.',
        logo: 'img/charities/indiana_sports_charities.png',
        link: 'https://ronkittlecharities.org/'
      },
      {
        name: 'Plano Baseball Association',
        amount: '$2,000',
        description: 'PBA, a non-profit organization, hosts both recreational and competitive baseball and softball for youth in Plano and the surrounding communities.',
        logo: 'img/charities/plano_baseball_association.png',
        link: ''
      },
      {
        name: 'Umpiring School',
        amount: '$500',
        description: 'Donation to help kids who want to learn to umpire but can\'t afford equipment.',
        logo: 'img/charities/nbbclogo.png',
        link: ''
      },
      {
        name: 'Hope for Families Center, Vero Beach, FL',
        amount: '$200',
        description: 'The Homeless Family Center provides Emergency and Transitional Shelter for Homeless Families from Indian River, St. Lucie, Martin, and Okeechobee Counties.',
        logo: 'img/charities/hope_for_families.jpg',
        link: 'https://verobeach.com/vero-beach-community/hope-for-families-center'
      }
    ],
    '2005': [
      {
        name: 'Dan and Amy Carroll Project',
        amount: '$1,000',
        description: 'Donation to the Dan and Amy Carroll Project in memory of their daughter.',
        logo: 'img/charities/nbbclogo.png',
        link: ''
      },
      {
        name: 'William Morris Cancer Fund',
        amount: '$1,000',
        description: 'Donation to the William Morris Cancer Fund in honor of a 5 year old boy.',
        logo: 'img/charities/nbbclogo.png',
        link: ''
      }
    ],
    '2004': [
      {
        name: 'Randy Johnson Striking Out Homelessness',
        amount: '$63,576',
        description: 'Randy Johnson pledges to donate $1,000 per victory and $100 per strikeout to charities and organizations that help the homeless in the communities where he plays.',
        logo: 'img/charities/nbbclogo.png',
        link: ''
      },
      {
        name: 'Gary Hunter Make-A-Wish Trip',
        amount: '$5,425',
        description: 'ALS victim Gary Hunter\'s dream trip to Las Vegas.',
        logo: 'img/charities/nbbclogo.png',
        link: ''
      },
      {
        name: 'Jim "Catfish" Hunter ALS Foundation',
        amount: '$2,000',
        description: 'The mission of the Jim "Catfish" Hunter ALS Foundation is to assist patients and caregivers, thereby easing the burden of ALS and improving quality of life.',
        logo: 'img/charities/jim_catfish_hunter_foundation.png',
        link: 'http://www.catfishfoundation.org'
      },
      {
        name: 'India Baseball Coach of the Year Award',
        amount: '$380',
        description: 'Trophy and shipment for 2004 India Baseball Coach of the Year award.',
        logo: 'img/charities/nbbclogo.png',
        link: ''
      },
      {
        name: 'Cal Ripken Sr. Foundation',
        amount: '$200',
        description: 'The Cal Ripken, Sr. Foundation helps to build character and teach critical life lessons to disadvantaged young people residing in America\'s most distressed communities through baseball and softball themed programs.',
        logo: 'img/charities/cal_ripken_sr_foundation.jpg',
        link: 'http://www.ripkenfoundation.org'
      }
    ],
    '2003': [
      {
        name: 'Baseball Assistance Team (B.A.T.)',
        amount: '$38,863',
        description: 'The primary objective of the Baseball Assistance Team is to aid those members of the "baseball family" most in need. B.A.T. strives to provide a means of support to people who are unable to help themselves.',
        logo: 'img/charities/bat.jpg',
        link: 'https://www.mlb.com/baseball-assistance-team'
      },
      {
        name: 'Nolan Ryan Foundation',
        amount: '$17,400',
        description: 'The Nolan Ryan Foundation, a 501(c)(3) nonprofit organization, was formed in Alvin, Texas in 1990. Nolan and Ruth generously give their time for signing and other fund-raising efforts that enable the Foundation to provide resources for youth, education, and community development.',
        logo: 'img/charities/nolan_ryan_foundation.png',
        link: 'https://www.nolanryanfoundation.org'
      },
      {
        name: 'Negro League Reunion',
        amounts: [
          { label: 'Negro League Reunion', amount: '$7,500' },
          { label: 'Burial for Negro League Veteran', amount: 'Private' }
        ],
        description: 'Donation to support reunion of 13 Negro League veterans in Round Rock, TX.',
        logo: 'img/charities/negro_league.jpg',
        link: ''
      },
      {
        name: 'India Baseball Projects',
        amounts: [
          { label: 'India Baseball Coaching Project', amount: '$5,500' },
          { label: 'India Baseball Equipment Purchase', amount: '$680' },
          { label: 'India Baseball Equipment Project', amount: '$580' }
        ],
        description: 'Travel to Southern India to coach and teach throughout Southern India (3 men). Equipment and youth uniforms for shipment to India to begin playing baseball in the schools. Shipping over of equipment for the support of the start of baseball in schools throughout Southern India.',
        logo: 'img/charities/nbbclogo.png',
        link: ''
      },
      {
        name: '"Best of In the Bleachers" Charity Rewards',
        amount: '$3,100',
        description: 'Signed books donated by cartoonist Steve Moore to thank No Bats Baseball Club charity donors.',
        logo: 'img/charities/best_of_in_the_bleachers.jpg',
        link: ''
      },
      {
        name: 'Gold Crown Foundation',
        amount: '$650',
        description: 'The Gold Crown Foundation is a non-profit 501(c)3 public charity founded in 1986 by former NBA great Bill Hanzlik and Colorado business leader Ray Baker. The organization operates with a mission to provide opportunities and "Educate Youth and Community Through Sports and Enrichment Programs".',
        logo: 'img/charities/gold_crown_foundation.jpg',
        link: 'http://www.goldcrownfoundation.com'
      },
      {
        name: 'Jim "Catfish" Hunter ALS Foundation',
        amount: '$250',
        description: 'The mission of the Jim "Catfish" Hunter ALS Foundation is to assist patients and caregivers, thereby easing the burden of ALS and improving quality of life.',
        logo: 'img/charities/jim_catfish_hunter_foundation.png',
        link: 'http://www.catfishfoundation.org'
      }
    ],
    '2002': [
      {
        name: 'Cal Ripken Sr. Foundation',
        amounts: [
          { label: 'Cal Ripken Sr. Foundation', amount: '$87,300' },
          { label: 'Video Project to support launch', amount: '$10,000' },
          { label: 'Boys Club Project at Moses Lake, WA', amount: '$7,500' }
        ],
        description: 'The Cal Ripken, Sr. Foundation helps to build character and teach critical life lessons to disadvantaged young people residing in America\'s most distressed communities through baseball and softball themed programs.',
        logo: 'img/charities/cal_ripken_sr_foundation.jpg',
        link: 'http://www.ripkenfoundation.org'
      },
      {
        name: 'Baltimore Reads',
        amount: '$10,000',
        description: 'Via our portable classrooms we offer FREE English as a Second Language (ESOL), reading and GED prep programs across Baltimore City.',
        logo: 'img/charities/baltimore_reads.jpg',
        link: 'http://www.baltimorereads.org'
      },
      {
        name: 'Jim "Catfish" Hunter ALS Foundation',
        amount: '$5,000',
        description: 'The mission of the Jim "Catfish" Hunter ALS Foundation is to assist patients and caregivers, thereby easing the burden of ALS and improving quality of life.',
        logo: 'img/charities/jim_catfish_hunter_foundation.png',
        link: 'http://www.catfishfoundation.org'
      },
      {
        name: 'Cocker Kids\' Foundation',
        amount: '$3,500',
        description: 'Cocker Kids\' Foundation is a non-profit, community supported foundation dedicated to supporting and aiding area youth up to the age of 21 in areas of education, recreation, the arts and athletics.',
        logo: 'img/charities/cocker_kids_foundation.jpg',
        link: ''
      }
    ],
    '2001': [
      {
        name: 'Chicago Cubs Care',
        amounts: [
          { label: 'Chicago Cubs Care', amount: '$56,238' },
          { label: 'McCormick Trust 50% Matching Funds', amount: '$28,119' }
        ],
        description: 'The Cubs and Cubs Charities are proud to assist agencies by providing financial support to sustain the impactful work they are undertaking in the areas of health, fitness and education for underserved youth.',
        logo: 'img/charities/cubs_care.jpg',
        link: 'https://www.mlb.com/cubs/community/cubs-charities/cubs-care'
      }
    ],
    '2000': [
      {
        name: 'Dave Dravecky\'s Outreach of Hope',
        amount: '$36,368',
        description: 'The ministry of Endurance (formerly Dave Dravecky\'s Outreach of Hope) continues to offer provision through the journey of suffering for those who are facing serious illness, loss or depression.',
        logo: 'img/charities/endurance.png',
        link: 'http://www.endurance.org'
      }
    ],
    '1999': [
      {
        name: 'Jim "Catfish" Hunter ALS Foundation',
        amount: '$38,500',
        description: 'The mission of the Jim "Catfish" Hunter ALS Foundation is to assist patients and caregivers, thereby easing the burden of ALS and improving quality of life.',
        logo: 'img/charities/jim_catfish_hunter_foundation.png',
        link: 'http://www.catfishfoundation.org'
      }
    ],
    '1998': [
      {
        name: 'Nolan Ryan Foundation',
        amount: '$21,914',
        description: 'The Nolan Ryan Foundation, a 501(c)(3) nonprofit organization, was formed in Alvin, Texas in 1990. Nolan and Ruth generously give their time for signing and other fund-raising efforts that enable the Foundation to provide resources for youth, education, and community development.',
        logo: 'img/charities/nolan_ryan_foundation.png',
        link: 'https://www.nolanryanfoundation.org'
      }
    ],
    '1997': [
      {
        name: 'Friends of Rickwood Field',
        amount: '$1,000',
        description: 'Donation for field restoration of America\'s oldest ballpark (a National Historic Landmark).',
        logo: 'img/charities/rickwood_field.jpg',
        link: 'https://www.rickwood.com'
      }
    ]
  };
  return charityData[year] || [];
}

// Close modal when clicking outside
document.addEventListener('DOMContentLoaded', function() {
  document.getElementById('charityModal').addEventListener('click', function(e) {
    if (e.target === this) {
      closeCharityModal();
    }
  });

  // Close modal with Escape key
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
      closeCharityModal();
    }
  });
});
