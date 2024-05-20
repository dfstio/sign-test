import { __decorate, __metadata } from "tslib";
import { Field, SmartContract, method, state, State } from 'o1js';
export class SignTestContract extends SmartContract {
    constructor() {
        super(...arguments);
        this.value = State();
    }
    async setValue(value) {
        this.value.set(value);
    }
}
__decorate([
    state(Field),
    __metadata("design:type", Object)
], SignTestContract.prototype, "value", void 0);
__decorate([
    method,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Field]),
    __metadata("design:returntype", Promise)
], SignTestContract.prototype, "setValue", null);
//# sourceMappingURL=index.js.map