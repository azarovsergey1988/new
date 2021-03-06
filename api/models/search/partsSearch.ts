import {CreateModel} from "../../core/createModel";

export const searchModels = {
    CF_ENV_RISK: null,
    CF_INV_AVAILABLE: null,
    CF_LC_RISK: null,
    CF_MOD_DATE: null,
    CF_TEMP_GRADE: null,
    CLASS_ID: null,
    DRC_DUE_DLGC_LVL: null,
    DRC_STATUS: null,
    MAT_PACKAGE_PTR: null,
    OBJ_ID: null,
    TREE_ID: null,
    V_CAGE_CODE: null,
    V_DEV_STATUS_SPR: null,
    V_ECCN: null,
    V_ECCN_GOVERNANCE: null,
    V_FFF_GRP_CODE: null,
    V_HTS_CODE: null,
    V_MFR_DESC_SPR: null,
    V_PRTY_STYPE: null,
    V_PRT_CTYPE: null,
    V_PRT_DESCR_SPR: null,
    V_PRT_ECCN_PTR: null,
    V_PRT_GENERIC_SPR: null,
    V_PRT_MFG_PTR_SPR: null,
    V_PRT_NBR_SPR: null,
    V_PRT_REL_INFO: null,
    V_PRT_SOURCE: null,
    V_SB_CODE: null,
    V_SHORT_MANUFACTURER_NAME: null,
    V_STRIPPED_PN: null,
    V_VMF_BUS_STAT: null,
    V_VMF_NAME: null,
    category: null,
    id: null,
    type: null,
    V_MFR_PKG_DESC_SPR: null,
    REACH_FLAG: null,
    ROHS5_FLAG: null,
    ROHS_FLAG: null,
    SVHC_CAS: null,
};

export function getDataFromPartsSearch (data:any) {
    CreateModel.parseListOfBomsToListOfAttributeArrays(data, searchModels)
}