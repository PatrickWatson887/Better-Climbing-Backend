let database = require("../database");
let { Tables, CoachesItemsTable } = require("../enumerations");



module.exports.getCoachesItems = async (coachId) => {
    return await database.getItemByField(Tables.COACHES_ITEMS, CoachesItemsTable.COACH_ID, coachId);
};

module.exports.getAllItems = async () => {
    return await database.getAllEntriesInTable(Tables.COACHES_ITEMS);
};