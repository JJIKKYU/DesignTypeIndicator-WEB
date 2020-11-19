// F
import F_FE from '../lottie/F_FE.json'
import F_FI from '../lottie/F_FI.json'
import F_FN from '../lottie/F_FN.json'
import F_FS from '../lottie/F_FS.json'

// J
import F_JE from '../lottie/F_JE.json'
import F_JI from '../lottie/F_JI.json'
import F_JN from '../lottie/F_JN.json'
import F_JS from '../lottie/F_JS.json'

// P
import F_PE from '../lottie/F_PE.json'
import F_PI from '../lottie/F_PI.json'
import F_PN from '../lottie/F_PN.json'
import F_PS from '../lottie/F_PS.json'

// T
import F_TE from '../lottie/F_TE.json'
import F_TI from '../lottie/F_TI.json'
import F_TN from '../lottie/F_TN.json'
import F_TS from '../lottie/F_TS.json'


// F
import M_FE from '../lottie/M_FE.json'
import M_FI from '../lottie/M_FI.json'
import M_FN from '../lottie/M_FN.json'
import M_FS from '../lottie/M_FS.json'

// J
import M_JE from '../lottie/M_JE.json'
import M_JI from '../lottie/M_JI.json'
import M_JN from '../lottie/M_JN.json'
import M_JS from '../lottie/M_JS.json'

// P
import M_PE from '../lottie/M_PE.json'
import M_PI from '../lottie/M_PI.json'
import M_PN from '../lottie/M_PN.json'
import M_PS from '../lottie/M_PS.json'

// T
import M_TE from '../lottie/M_TE.json'
import M_TI from '../lottie/M_TI.json'
import M_TN from '../lottie/M_TN.json'
import M_TS from '../lottie/M_TS.json'

const types = {
    F_FE,
    F_FI,
    F_FN,
    F_FS,
    F_JE,
    F_JI,
    F_JN,
    F_JS,
    F_PE,
    F_PI,
    F_PN,
    F_PS,
    F_TE,
    F_TI,
    F_TN,
    F_TS,

    M_FE,
    M_FI,
    M_FN,
    M_FS,
    M_JE,
    M_JI,
    M_JN,
    M_JS,
    M_PE,
    M_PI,
    M_PN,
    M_PS,
    M_TE,
    M_TI,
    M_TN,
    M_TS,
}

export const getType = (name) => {
    return types[name];
}