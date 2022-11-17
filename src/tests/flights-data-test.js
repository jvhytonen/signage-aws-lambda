const testFlightData = [
    {
        type: 'departures',
        data: [
            {
                airline: "OJ",
                flightNr: ["OJ425"],
                destination: "Kokkola / Kruunupyy",
                scheduled: "11:05",
                actual: null,
                estimated: null,
                terminal: null,
                gate: null
            },
            {
            airline: "Nordic Regional",
                flightNr: ["N71143", "AY1143"],
                destination: "Warsaw",
                scheduled: "11:35",
                actual: "11:28",
                estimated: "11:28",
                terminal: null,
                gate: null
            },
            {
                airline: "Finnair",
                    flightNr: ["AY953"],
                    destination: "Copenhagen",
                    scheduled: "11:45",
                    actual: "11:41",
                    estimated: "11:41",
                    terminal: null,
                    gate: null
                }
        ]
    },
    {
        type: 'Arrivals',
        data: [
            {
              airline: "Nordic Regional",
              flightNr: ["N7631", "AY631"],
              destination: "Kemi/Tornio",
              scheduled: "11:45",
              actual: null,
              estimated: null,
              terminal: 2,
              baggage: 12
            },
            {
                airline: "RP",
                flightNr: ["RP5694", "W25694"],
                destination: "Pori",
                scheduled: "14:45",
                actual: null,
                estimated: null,
                terminal: 2,
                baggage: 11
              },
              {
                airline: "Finnair",
                flightNr: ["AY1252", "BA6064", "JL6858"],
                destination: "Budapest",
                scheduled: "15:00",
                actual: null,
                estimated: null,
                terminal: 2,
                baggage: 4
              },
              {
                airline: "Finnair",
                flightNr: [["AY1412", "AA8998", "CX1423", "JL6816"],["JL6816", "JL6816", "VN3692"]],
                destination: "Frankfurt am Main",
                scheduled: "15:10",
                actual: null,
                estimated: null,
                terminal: 2,
                baggage: 12
              },
        ]
    }
] 