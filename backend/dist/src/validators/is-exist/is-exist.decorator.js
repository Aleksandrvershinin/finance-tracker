"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IsExist = IsExist;
const class_validator_1 = require("class-validator");
const is_exist_validator_1 = require("./is-exist.validator");
function IsExist(tableName, fieldName) {
    return (0, class_validator_1.Validate)(is_exist_validator_1.IsExistConstraint, [tableName, fieldName]);
}
//# sourceMappingURL=is-exist.decorator.js.map