import dayjs from "~/share/dayjs";

/* Mutations */
const SET_STATUS = "SET_STATUS";

export const state = () => ({
  apiKey: "496bfcfb6ddd40ef831e29858c8ba7a9",

  /* London */
  lat: "51.50643",
  lon: "-0.12719",

  apis: [
    /* *********** */
    /* Air Quality */
    /* *********** */
    {
      id: 1,
      name: "Air Quality - Current Conditions",
      path: "air-quality/v2/current-conditions",
      status: 1,
      params: {}
    },
    {
      id: 2,
      name: "Air Quality - Historical Hourly",
      path: "air-quality/v2/historical/hourly",
      status: 1,
      params: {
        datetime: dayjs
          .utc()
          .subtract(1, "day")
          .format("YYYY-MM-DDTHH:mm:ss")
      }
    },
    {
      id: 3,
      name: "Air Quality - Forecast Hourly",
      path: "air-quality/v2/forecast/hourly",
      status: 1,
      params: {
        datetime: dayjs
          .utc()
          .hour(24)
          .format("YYYY-MM-DDTHH:mm:ss")
      }
    },

    /* ****** */
    /* Pollen */
    /* ****** */
    {
      id: 4,
      name: "Pollen - Current Conditions",
      path: "pollen/v2/current-conditions",
      status: 1,
      params: {
        days: 1
      }
    },
    {
      id: 5,
      name: "Pollen - Forecast Daily",
      path: "pollen/v2/forecast/daily",
      status: 1,
      params: {
        days: 1
      }
    },

    /* ***** */
    /* Fires */
    /* ***** */
    {
      id: 6,
      name: "Fires - Current Conditions",
      path: "fires/v1/current-conditions",
      status: 1
    },
    {
      id: 7,
      name: "Fires - Historical Hourly",
      path: "fires/v1/historical/hourly",
      status: 1,
      params: {
        datetime: dayjs
          .utc()
          .subtract(1, "day")
          .format("YYYY-MM-DDTHH:mm:ss")
      }
    },

    /* ******* */
    /* Weather */
    /* ******* */
    {
      id: 8,
      name: "Weather - Current Conditions",
      path: "weather/v1/current-conditions",
      status: 1,
      params: {}
    }
  ]
});

export const mutations = {
  [SET_STATUS](state, { id, status }) {
    state.apis.find(x => x.id === id).status = status;
  }
};

export const getters = {
  isAllServicesUp: state => {
    return state.apis.every(api => api.status === 1);
  },
  isAllServicesDown: state => {
    return state.apis.every(api => api.status === 0);
  }
};
