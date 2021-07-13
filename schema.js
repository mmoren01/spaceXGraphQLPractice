const axios = require('axios');
const {
  GraphQLObjectType,
  GraphQLList,
  GraphQLSchema,
  GraphQLInt,
  GraphQLString,
  GraphQLBoolean
} = require('graphql');

//ALL LAUNCHES TYPE
const LaunchesType = new GraphQLObjectType({
  name: 'Launches',
  fields: () => ({
    flight_number: { type: GraphQLInt },
    name: { type: GraphQLString },
    date_local: { type: GraphQLString },
    success: { type: GraphQLBoolean },
    rocket: { type: GraphQLString },
    id: { type: GraphQLString }
    //THE TUTORIAL WAS BASED ON V3 OF THE API WHICH IS DEPRECATED
    //NEED TO REFACTOR FOR V4 OF SPACE-X API
    // rocket: { type: RocketType }
  })
});

//SINGLE LAUNCH TYPE
const LaunchType = new GraphQLObjectType({
  name: 'Launch',
  fields: () => ({
    flight_number: { type: GraphQLInt },
    name: { type: GraphQLString },
    date_local: { type: GraphQLString },
    success: { type: GraphQLBoolean },
    rocket: { type: GraphQLString },
    id: { type: GraphQLString }
    // details: { type: GraphQLString }
  })
});


//Rocket Type
const RocketsType = new GraphQLObjectType({
  name: 'Rockets',
  fields: () => ({
    id: { type: GraphQLString },
    name: { type: GraphQLString },
  })
});

const RocketType = new GraphQLObjectType({
  name: 'Rocket',
  fields: () => ({
    name: { type: GraphQLString },
    description: { type: GraphQLString },
    cost_per_launch: { type: GraphQLInt },
    success_rate_pct: { type: GraphQLInt }
  })
});

//Root Query
const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    launches: {
      type: new GraphQLList(LaunchesType),
      resolve(parent, args) {
        return axios
          .get('https://api.spacexdata.com/v4/launches')
          .then(res => res.data);
        }
      },
    launch: {
      type: LaunchType,
      args: { id: { type: GraphQLString }},
      resolve(parent, args) {
        return axios
          .get(`https://api.spacexdata.com/v4/launches/${args.id}`)
          .then(res => res.data)
      }
    },
    rockets: {
        type: new GraphQLList(RocketsType),
        resolve(parent, args) {
          return axios
            .get(`https://api.spacexdata.com/v4/rockets`)
            .then(res => res.data)
      }
    },
    rocket: {
      type: RocketType,
      args: { id: { type: GraphQLString } },
      resolve(parent, args) {
        return axios
          .get(`https://api.spacexdata.com/v4/rockets/${args.id}`)
          .then(res => res.data)
      }
    },
  }
});

module.exports = new GraphQLSchema({
  query: RootQuery
});