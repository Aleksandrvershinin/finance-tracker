"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IsUnique = IsUnique;
const class_validator_1 = require("class-validator");
const is_unique_validator_1 = require("./is-unique.validator");
function IsUnique(tableName, fieldName) {
    return (0, class_validator_1.Validate)(is_unique_validator_1.IsUniqueConstraint, [tableName, fieldName]);
}
//# sourceMappingURL=is-unique.decorator.js.map