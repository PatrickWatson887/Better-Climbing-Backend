module.exports.Tables = {
  TAGS: "tags",
  SYNONYMS: "synonyms",
  TAGS_SYNONYMS: "tags_synonyms",
  COACHES_TAGS: "coaches_tags",
  COACHES: "coaches",
  FEATURES: "features",
  COACHES_FEATURES: "coaches_features",
  COACHES_ITEMS: "coaches_items",
  ITEMS_TAGS: "items_tags",
  QUALIFICATIONS: "qualifications",
  COACHES_QUALIFICATIONS: "coaches_qualifications",
  PROFESSIONAL_ORGANISATIONS: "professional_organisations",
  COACHES_PROFESSIONAL_ORGANISATIONS: "coaches_professional_organisations",
  WALLS: "walls",
  CLASSES: "classes"
};

module.exports.TagsTable = {
  PRIMARY_KEY: "id",
  TITLE: "title",
  DESCRIPTION: "description"
};

module.exports.SynonymsTable = {
  PRIMARY_KEY: "id",
  TITLE: "title",
};

module.exports.TagsSynonymsTable = {
  PRIMARY_KEY: "id",
  TAG_ID: "tag_id",
  SYNONYM_ID: "synonym_id"
}

module.exports.CoachTagsTable = {
  PRIMARY_KEY: "id",
  COACH_ID: "coach_id",
  TAG_ID: "tag_id"
};

module.exports.QualificationsTable = {
  PRIMARY_KEY: "id",
  ACRONYM: "acronym",
  TITLE: "title"
}

module.exports.CoachesQualificationsTable = {
  PRIMARY_KEY: "id",
  COACH_ID: "coach_id",
  QUALIFICATIONS_ID: "qualification_id"
}

module.exports.ProfessionalOrganisationsTable = {
  PRIMARY_KEY: "id",
  TITLE: "title",
  LINK: "link"
}

module.exports.CoachesProfessionalOrganisationsTables = {
  PRIMARY_KEY: "id",
  COACH_ID: "coach_id",
  PROF_ORG_ID: "prof_org_id"
}

module.exports.ItemsTagsTables = {
  PRIMARY_KEY: "id",
  ITEM_ID: "item_id",
  TAG_ID: "tag_id"
}

module.exports.CoachTable = {
  PRIMARY_KEY: "id",
  FIRST_NAME: "first_name",
  SURNAME: "surname",
  PROFILE_PIC_URL: "profile_pic_url",
  RATING: "rating",
  LOCATION: "location",
  LONGITUDE: "longitude",
  LATITUDE: "latitude",
  DESCRIPTION: "description",
  SUMMARY: "summary",
  PHONE_NUMBER: "phone_number",
  EMAIL_ADDRESS: "email_address",
  YEARS_CLIMBING: "years_climbing",
  YEARS_COACHING: "years_caoching",
  BUSINESS_NAME: "business_name"
};

module.exports.FeaturesTable = {
  PRIMARY_KEY: "id",
  TITLE: "title",
  DESCRIPTION: "description"
}

module.exports.CoachesFeatureTable = {
  PRIMARY_ID: "id",
  COACH_ID: "coach_id",
  FEATURE_ID: "feature_id"
}

module.exports.CoachesItemsTable = {
  PRIMARY_KEY: "id",
  COACH_ID: "coach_id",
  PRICE: "price",
  TITLE: "title",
  DESCRIPTION: "description",
  SPACES: "spaces",
  SPACES_Filled: "spaces_filled"
}

module.exports.WallTable = {
  PRIMARY_KEY: "id",
  NAME: "name",
  PROFILE_PIC_URL: "profile_pic_url",
  ADDRESS: "address"
};

module.exports.ClassTable = {
  PRIMARY_KEY: "id",
  TITLE: "title",
  COACH_ID: "coach_id",
  WALL_ID: "wall_id",
  DESCRIPTION: "description",
  LOCATION: "location",
  COST: "cost"
};

module.exports.ApiDataTypes = {
  TAGS: "tags"
};

module.exports.S3BucketNames = {
  COACHES: "better-climbing-coaches",
  CLASSES: "better-climbing-classes",
  WALLS: "better-climbing-walls"
};

module.exports.AWS_ACCOUNT_ID = process.env.AWS_ACCOUNT_ID;
module.exports.AWS_ACCESS_KEY_ID = process.env.AWS_ACCESS_KEY_ID;
module.exports.AWS_SECRET_ACCESS_KEY = process.env.AWS_SECRET_ACCESS_KEY;
module.exports.AWS_PROFILE = process.env.AWS_PROFILE || "default";
module.exports.AWS_REGION = "eu-west-1";

module.exports.HOME_DIRECTORY = process.env[(process.platform === 'win32') ? 'USERPROFILE' : 'HOME'];