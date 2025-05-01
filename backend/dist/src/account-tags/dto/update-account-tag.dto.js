"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateAccountTagDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const create_account_tag_dto_1 = require("./create-account-tag.dto");
class UpdateAccountTagDto extends (0, mapped_types_1.PartialType)(create_account_tag_dto_1.CreateAccountTagDto) {
}
exports.UpdateAccountTagDto = UpdateAccountTagDto;
//# sourceMappingURL=update-account-tag.dto.js.map