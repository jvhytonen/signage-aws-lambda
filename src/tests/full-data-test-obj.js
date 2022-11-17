export const responseObj = {
  publicTransport: [
    {
      scheduledDeparture: '11:20',
      headsign: 'Helsinki via Huopalahti'
    },
    {
      scheduledDeparture: '11:26',
      headsign: 'Helsinki via Tikkurila'
    },
    {
      scheduledDeparture: '11:40',
      headsign: 'Helsinki via Huopalahti'
    }
  ],
  news: [
    {
      source: {
        id: 'bbc-news',
        name: 'BBC News'
      },
      author: 'BBC News',
      title:
        'China Covid: Millions back in lockdown as Beijing doubles down on zero-Covid',
      description:
        'Dozens of cities across the country have been affected by varying degrees of restrictions.',
      urlToImage:
        'https://ichef.bbci.co.uk/news/1024/branded_news/6626/production/_127405162_gettyimages-1243345666.jpg',
      publishedAt: 'Oct 28 - 07:52'
    },
    {
      source: {
        id: 'bbc-news',
        name: 'BBC News'
      },
      author: 'BBC News',
      title:
        "US midterms: Biden warns 'democracy is on the ballot' in Florida rally",
      description:
        'The president has been campaigning in the key state of Florida, while Mike Pence visited Georgia to support its Republican governor.',
      urlToImage:
        'https://m.files.bbci.co.uk/modules/bbc-morph-news-waf-page-meta/5.3.0/bbc_news_logo.png',
      publishedAt: 'Nov 02 - 10:37'
    },
    {
      source: {
        id: 'bbc-news',
        name: 'BBC News'
      },
      author: 'BBC News',
      title:
        "Migos rapper Takeoff killed by 'stray bullet', record label claims",
      description:
        'The star, who was 28, died on Tuesday night after an altercation at a bowling alley in Houston.',
      urlToImage:
        'https://ichef.bbci.co.uk/news/1024/branded_news/2ED3/production/_127478911_gettyimages-852603210.jpg',
      publishedAt: 'Nov 02 - 09:52'
    }
  ],
  weather: {
    location: 'Helsinki',
    currentCond: {
      temp: 10.5,
      icon: 'partlycloudyday',
      description: 'Partially cloudy'
    },
    tomorrow: {
      temp: 15,
      icon: 'cloudy',
      description: 'Cloudy skies throughout the day.'
    }
  },
  adsInfo: [
    {
      type: 'info',
      infoData:
        "<div className='h-full w-full flex flex-col justify-around items-center text-3xl'><h2 className='text-5xl mb-5'>Breakfast</h2><p className='my-3'>Mon - Fri 6am - 10am</p><p className='my-3'>Sat - Sun 7am - 10am</p><p className='my-3'>Restaurant Lounge Club (1st floor)</p></div>"
    },
    {
      type: 'info',
      infoData:
        "<div className='h-full w-full flex flex-col justify-around items-center text-3xl'><h2 className='text-5xl mb-5'>Gym</h2><p className='my-3'>Every day 6am - 10pm</p><h2 className='my-3'>Sauna &amp; Pool</h2><p className='my-3'>Every day 6pm - 11pm</p><p className='my-3'>Location: 2nd floor</p></div>"
    },
    {
      type: 'info',
      infoData:
        "<h2 className='text-5xl mb-5 text-center'>Shuttle bus to the Airport</h2><div className='h-full w-full flex justify-around items-start text-3xl'><div className='w-1/2 h-full'><ul className='ml-3 flex flex-col justify-center'><li className='my-3'>Travel time hotel-airport: 6 min</li><li className='my-3'>Visits terminal 1 and 2 </li></ul></div><div className='w-1/2 h-full'><ul className='ml-3'><li className='font-bold mb-2'>Mon - Sun 6am - 10pm</li><li className='mb-2'>Every half hour</li><li className='font-bold mb-2'>Nighttime (10pm - 6am)</li><li className='mb-2'>Only on upon request </li><li className='mb-2'>Call +45354 234234234</li></ul></div></div>"
    },
    {
      type: 'ad',
      url: 'https://i.giphy.com/media/h2CN7TlrNWxBCyUSqk/giphy.webp'
    }
  ]
}
