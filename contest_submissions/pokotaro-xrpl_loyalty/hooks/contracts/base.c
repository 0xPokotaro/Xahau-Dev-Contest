/**
 *
 */
#include "hookapi.h"

int64_t hook(uint32_t reserved) {

    TRACESTR("Base.c: Called.");

    // ACCOUNT: Origin Tx Account　（トランザクションの送信元アカウントのアドレス）
    uint8_t otxn_accid[20];
    otxn_field(SBUF(otxn_accid), sfAccount);
    TRACEHEX(otxn_accid);

    // ACCOUNT: Hook Account　（Hookがインストールされているアカウントのアドレス）
    uint8_t hook_accid[20];
    hook_account(SBUF(hook_accid));
    TRACEHEX(hook_accid);

    int64_t tt = otxn_type();
    TRACEVAR(tt);

    // Tx: URITokenMint
    if (tt == 45) {
        TRACESTR("Base.c: URITokenMint");

         // ACCOUNT: Dest Tx Account　（トランザクションの送信先アカウントのアドレス）
        uint8_t otxn_dstid[20];
        otxn_field(SBUF(otxn_dstid), sfDestination);
        TRACEHEX(otxn_dstid);

        // 送金額をHooksパラメータから取得
        uint8_t amount_param[8];
        otxn_param(SBUF(amount_param), "A", 1);
        TRACEVAR(amount_param);

        int64_t amount = *((int64_t*)amount_param);
        TRACEVAR(amount);

        // 送信先アカウントをキーとして状態に保存
        state_set(SBUF(otxn_dstid), (uint32_t)&amount, sizeof(amount));
        accept(SBUF("Base.c: XRP deposited"), __LINE__);
    }

    // Tx: URITokenBurn
    if (tt == 46) {
        TRACESTR("Base.c: URITokenBurn");
    }

    // Tx: URITokenBuy
    if (tt == 47) {
        TRACESTR("Base.c: URITokenBuy");
    }

    // Tx: Invoke
    if (tt == 99) {
        TRACESTR("Base.c: Invoke");
    }

    accept(SBUF("base: Finished."), __LINE__);

    _g(1,1);
    // unreachable
    return 0;
}
