let { Tables, TagsTable, SynonymsTable, TagsSynonymsTable} = require("../enumerations");
let database = require("../database");
let utils = require("../utils");

module.exports.createTag = async () => {

};

module.exports.deleteTag = async () => {

};

module.exports.modifyTag = async (tagId) => {

};

module.exports.createCoachTagsEntry = async (tags) => {
  let tagCount = 5;
  let columns = `${enums.CoachTagsTable.TAG_1}, ${enums.CoachTagsTable.TAG_2}, ${enums.CoachTagsTable.TAG_3}, ${enums.CoachTagsTable.TAG_4}, ${enums.CoachTagsTable.TAG_5}`;
  let values = "";

  for (let index = 0; index < tagCount; index++) {
    // If tags array is null or tags[index] = null/defined, return null
    values += (tags === null || tags[index] == null) ? `null, ` : `'${tags[index]}', `;
  }

  // remove trailing ", "
  values = values.substr(0, values.length - 2);
  try {
    return await database.createItem(enums.Tables.COACH_TAGS, columns, values);
  } catch (err) {
    throw { error: `Failed to create coach tags entry: ${err}`};
  }
};

module.exports.modifyCoachTags = async () => {

};

module.exports.getTagsWithSynonyms = async () => {
  let outputColumns = `${Tables.TAGS}.${TagsTable.PRIMARY_KEY}, ${Tables.SYNONYMS}.${SynonymsTable.TITLE}`;
  return await database.joinTablesAndListEntries(Tables.TAGS, TagsTable.PRIMARY_KEY, outputColumns,
    Tables.SYNONYMS, SynonymsTable.PRIMARY_KEY, Tables.TAGS_SYNONYMS, TagsSynonymsTable.TAG_ID, TagsSynonymsTable.SYNONYM_ID);
};


module.exports.getAllItems = async () => {
  return await database.getAllEntriesInTable(Tables.TAGS);
};

