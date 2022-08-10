let { Tables, CoachTable, TagsTable, CoachTagsTable, FeaturesTable, CoachesFeatureTable} = require("../enumerations");
let database = require("../database");
let tags = require("../tags/tags")

module.exports.createCoach = async (name, profilePicURL=null, rating=null, tagArray=null, location=null,
                                    description=null, summary=null, phoneNumber=null, emailAddress=null) => {
  return new Promise( async (resolve, reject) => {
    // check if coach already exists
    let user = await module.exports.getCoachByName(name);
    if (user === "Could not find an entry for this ID") {
      await tags.createCoachTagsEntry(tagArray).then(async (response) => {
        let coachTagEntry = response.rows[0].id;
        let columns = `${CoachTable.NAME}, ${CoachTable.PROFILE_PIC_URL}, ${CoachTable.RATING}, ${CoachTable.TAGS_ENTRY_ID}, ${CoachTable.LOCATION}, ${CoachTable.DESCRIPTION}, ${CoachTable.SUMMARY}, ${CoachTable.PHONE_NUMBER}, ${CoachTable.EMAIL_ADDRESS}`;
        let values = `${name}, ${profilePicURL}, ${rating}, ${coachTagEntry}, ${location}, ${description}, ${summary}, ${phoneNumber}, ${emailAddress}`;
        try {
          let response = await database.createItem(Tables.COACHES, columns, values);
          resolve(response);
        } catch (err) {
          reject({error: `Could not create new Coach entry: ${err}}`});
        }
      });
    } else {
      resolve({error: `A coach with name: ${name} already exists`});
    }
  });
};

module.exports.deleteCoach = async (coachId) => {

};

module.exports.getCoach = async (coachId) => {
  return await database.getItemByField(Tables.COACHES, CoachTable.PRIMARY_KEY, coachId);
};

module.exports.getCoachByName = async (coachName) => {
  return await database.getItemByField(Tables.COACHES, CoachTable.NAME, coachName);
}

module.exports.getAllCoaches = async () => {
  return await database.getAllEntriesInTable(Tables.COACHES);
};

module.exports.getFeaturedCoaches = async () => {
  let outputColumns = `${Tables.COACHES}.${CoachTable.PRIMARY_KEY} as coach_id, ${Tables.COACHES}.${CoachTable.FIRST_NAME}, ${Tables.COACHES}.${CoachTable.SURNAME}, ${Tables.TAGS}.${TagsTable.PRIMARY_KEY} as tag_id,
    ${Tables.TAGS}.${TagsTable.TITLE} as tag, ${Tables.COACHES}.${CoachTable.RATING},
    ${Tables.COACHES}.${CoachTable.PROFILE_PIC_URL}, ${Tables.COACHES}.${CoachTable.LOCATION}, 
    ${Tables.COACHES}.${CoachTable.LATITUDE}, ${Tables.COACHES}.${CoachTable.LONGITUDE}, 
    ${Tables.COACHES}.${CoachTable.DESCRIPTION} as coach_description, ${Tables.FEATURES}.${FeaturesTable.TITLE} as feature_title, ${Tables.FEATURES}.${FeaturesTable.DESCRIPTION} as feature_description`;
  return await database.doubleJoinTablesAndListEntries(Tables.COACHES, Tables.TAGS, Tables.FEATURES, CoachTable.PRIMARY_KEY, TagsTable.PRIMARY_KEY, FeaturesTable.PRIMARY_KEY, Tables.COACHES_TAGS, Tables.COACHES_FEATURES, CoachTagsTable.COACH_ID, CoachTagsTable.TAG_ID,CoachesFeatureTable.COACH_ID, CoachesFeatureTable.FEATURE_ID, outputColumns);
};

module.exports.getCoachesWithTags = async () => {
  let outputColumns = `${Tables.COACHES}.${CoachTable.PRIMARY_KEY} as coach_id, ${Tables.TAGS}.${TagsTable.PRIMARY_KEY} as tag_id, ${Tables.COACHES}.${CoachTable.FIRST_NAME}, ${Tables.COACHES}.${CoachTable.SURNAME}, 
    ${Tables.TAGS}.${TagsTable.TITLE} as tag, ${Tables.COACHES}.${CoachTable.RATING},
    ${Tables.COACHES}.${CoachTable.PROFILE_PIC_URL}, ${Tables.COACHES}.${CoachTable.LOCATION}, 
    ${Tables.COACHES}.${CoachTable.LATITUDE}, ${Tables.COACHES}.${CoachTable.LONGITUDE}, 
    ${Tables.COACHES}.${CoachTable.DESCRIPTION} as coach_description`;
  return await database.joinTablesAndListEntries(Tables.COACHES, CoachTable.PRIMARY_KEY, outputColumns,
    Tables.TAGS, TagsTable.PRIMARY_KEY, Tables.COACHES_TAGS, CoachTagsTable.COACH_ID, CoachTagsTable.TAG_ID);
};

