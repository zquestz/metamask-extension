import { cloneDeep } from 'lodash';

const version = 63;

/**
 * Moves token state from preferences controller to TokensController
 */
export default {
  version,
  async migrate(originalVersionedData) {
    const versionedData = cloneDeep(originalVersionedData);
    versionedData.meta.version = version;
    const state = versionedData.data;
    const newState = transformState(state);
    versionedData.data = newState;
    return versionedData;
  },
};

function transformState(state) {
  const accountTokens = state?.PreferencesController?.accountTokens;
  const accountHiddenTokens = state?.PreferencesController?.accountHiddenTokens;

  if (accountTokens || accountHiddenTokens) {
    const flattenedIgnoredTokens = [];
    if (accountHiddenTokens) {
      Object.keys(accountHiddenTokens).forEach((accountAddress) => {
        Object.values(accountHiddenTokens[accountAddress]).forEach(
          (ignoredTokenArr) => {
            flattenedIgnoredTokens.push(...ignoredTokenArr);
          },
        );
      });
    }

    if (state.TokensController) {
      state.TokensController.allTokens = accountTokens;
      state.TokensController.ignoredTokens = flattenedIgnoredTokens;
    } else {
      state.TokensController = {
        allTokens: accountTokens,
        ignoredTokens: flattenedIgnoredTokens,
      };
    }

    delete state?.PreferencesController?.accountHiddenTokens;
    delete state?.PreferencesController?.accountTokens;
    delete state?.PreferencesController?.assetImages;
    delete state?.PreferencesController?.hiddenTokens;
    delete state?.PreferencesController?.tokens;
    delete state?.PreferencesController?.suggestedTokens;
  }

  return state;
}
