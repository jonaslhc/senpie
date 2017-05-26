const express = require('express');
const elasticsearch = require('elasticsearch');
const router  = express.Router();

// elasticsearch config
const index = 'user';
const type = 'userDetail';
const prop = 'content';
const client = new elasticsearch.Client({
  host: 'localhost:9200',
  log: 'trace'
});

const log = console.log.bind(console);

module.exports = (knex) => {
  const insertHelper = require('../../db/insert-helper')(knex);
  const queryHelper = require('../../db/query-helper')(knex);

  router.get('/', (req, res) => {
    const query = 'Jon';

    res.send('Hello');
    searching(query).then(res => {
    });
  });

  router.get('/:id', (req, res) => {
    const id = req.params.id;

    queryHelper.getUser(id).then(res => {
      console.log(res[0]);
    });
    queryHelper.getCompanyName(id).then(res => {
      console.log(res[0]);
    });
    queryHelper.getDegreeName(id).then(res => {
      console.log(res[0]);
    });
    queryHelper.getFullName(id).then(res => {
      console.log(res[0]);
    });
  });

  async function insertUser(data) {
    const userType = await insertHelper.insertUserType(data.userType);
    const user = await insertHelper.insertUser(data.name, data.email, userType[0]);
    const educationDegree = await insertHelper.insertEducationDegree(data.educationDegree);
    const title = await insertHelper.insertTitle(data.title);
    const company = await insertHelper.insertCompany(data.companyName, data.companyType, data.size);
    const educationDetail = await insertHelper.insertEducationDetail(user[0], educationDegree[0], data.gradYear);
    const companyDetail = await insertHelper.insertCompanyDetail(user[0], company[0], title[0]);

    const concatData = parseObject(data);

    await addToIndex(concatData, user[0]);
    // await getFromIndex(user[0]);
    // await waitForIndexing();
    // await search();
    return data;
  }

  async function searching(query) {
    await waitForIndexing();
    const searchResult = await search(query);
    // console.log(searchResult.hits.hits);
    console.log(searchResult.hits.hits);
    for (let i = 0; searchResult.hits.hits.length; i++) {
      console.log(searchResult.hits.hits[i]._source.content);
    }
  }

  return router;
};

function parseObject(data){
  let str = '';
  const ary = [];

  for (let property in data) {
    if (data.hasOwnProperty(property)) {
      str += data[property] + ' ';
    }
  }

  ary.push(str);
  return ary;
}


function addToIndex(content, id) {
  console.log('in addToIndex');
  let body = {};
  body[prop] = content;

  return client.create({
    index: index,
    type: type,
    id: id,
    body: body
  });
}

function search(query) {
  console.log('in search()');
  const body = {
    query: {
      multi_match: {
        type: 'most_fields',
        query: query,
        fields: [
          prop
        ]
      }
    }
  };
  return client.search({
    size: 15,
    index: index,
    body: body
  });
}

function getFromIndex(id) {
  console.log('in getFromIndex()');
  return client.get({
    id: id,
    index: index,
    type: type
  }).then(log);
}

function waitForIndexing() {
  log('Wait for indexing ....');
  return new Promise(function (resolve) {
    setTimeout(resolve, 2000);
  });
}
