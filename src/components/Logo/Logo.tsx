import React from "react";
import "./Logo.css";

const Logo: React.FC = () => {
  return (
    <svg
      className="logo"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 38.982853 6.508195"
      role="img"
      aria-label="Fundnova Logo"
    >

      <defs>
        {/* Градиент для заливки */}
        <linearGradient id="logo-fill-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#d4d4d4" /> {/* Светло-серебристый */}
          <stop offset="100%" stopColor="#a9a9a9" /> {/* Темно-серебристый */}
        </linearGradient>

        {/* Градиент для обводки */}
        <linearGradient id="logo-stroke-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#ffffff" /> {/* Белый оттенок */}
          <stop offset="100%" stopColor="#b0b0b0" /> {/* Серебристый */}
        </linearGradient>
      </defs>
      <g transform="translate(-75.068594,-502.89726)">
        <g
          transform="translate(-50.695169,323.00335)"
          style={{
            fill: "#2a2a2a", // Градиент для заливки
            stroke: "url(#logo-stroke-gradient)", // Градиент для обводки
            strokeWidth: 0.264583,
            strokeMiterlimit: 4,
          }}
        >
          <path d="m 125.89607,180.81768 v 4.6605 c 0,0.35853 0,0.35853 0.3585,0.35853 h 0.35851 c 0.3585,0 0.3585,0 0.3585,-0.35853 v -1.79249 h 1.79251 c 0.3585,0 0.3585,0 0.3585,-0.3585 v -0.3585 c 0,-0.3585 0,-0.3585 -0.3585,-0.3585 h -1.79251 v -1.07551 h 2.86802 c 0.3585,0 0.3585,0 0.3585,-0.3585 v -0.3585 c 0,-0.35851 0,-0.35851 -0.3585,-0.35851 h -3.58503 c -0.3585,0 -0.3585,0 -0.3585,0.35851 z" />
          <path d="m 131.6321,180.45917 c -0.3585,0 -0.3585,0 -0.3585,0.35851 v 4.6605 c 0,0.35853 0,0.35853 0.3585,0.35853 h 2.50952 c 0.3585,0 0.3585,0 0.3585,-0.35853 v -4.6605 c 0,-0.35851 0,-0.35851 -0.3585,-0.35851 h -0.3585 c -0.3585,0 -0.3585,0 -0.3585,0.35851 v 3.94352 h -1.07551 v -3.94352 c 0,-0.35851 0,-0.35851 -0.35851,-0.35851 z" />
          <path d="m 135.93413,180.45917 c -0.3585,0 -0.3585,0 -0.3585,0.35851 v 4.6605 c 0,0.35853 0,0.35853 0.3585,0.35853 h 0.3585 c 0.35851,0 0.35851,0 0.35851,-0.35853 v -2.86799 l 1.912,2.86799 c 0.23901,0.35853 0.23901,0.35853 0.59751,0.35853 h 0.3585 c 0.35851,0 0.35851,0 0.35851,-0.35853 v -4.6605 c 0,-0.35851 0,-0.35851 -0.35851,-0.35851 h -0.3585 c -0.3585,0 -0.3585,0 -0.3585,0.35851 v 2.86801 l -1.91201,-2.86803 c -0.239,-0.35849 -0.239,-0.35849 -0.59751,-0.35849 z" />
          <path d="m 140.95316,180.81768 v 4.6605 c 0,0.35853 0,0.35853 0.35851,0.35853 h 1.79251 c 0.53775,0 1.0755,0 1.0755,-0.53776 v -4.30202 c 0,-0.53776 -0.53775,-0.53776 -1.0755,-0.53776 h -1.79251 c -0.35851,0 -0.35851,0 -0.35851,0.35851 z m 1.07551,0.717 h 1.07551 v 3.22652 h -1.07551 z" />
          <path d="m 145.61369,180.45916 c -0.3585,0 -0.3585,0 -0.3585,0.3585 v 4.6605 c 0,0.35853 0,0.35853 0.3585,0.35853 h 0.3585 c 0.35851,0 0.35851,0 0.3585,-0.35853 v -2.86799 l 1.91201,2.86799 c 0.23901,0.35853 0.23901,0.35853 0.59751,0.35853 h 0.3585 c 0.35851,0 0.35851,0 0.3585,-0.35853 v -4.6605 c 1e-5,-0.3585 1e-5,-0.3585 -0.3585,-0.3585 h -0.3585 c -0.3585,0 -0.3585,0 -0.3585,0.3585 v 2.86801 l -1.91201,-2.86803 c -0.239,-0.35848 -0.239,-0.35848 -0.59751,-0.35848 z" />
          <path
            style={{
              fontStyle: "normal",
              fontVariant: "normal",
              fontWeight: "normal",
              fontStretch: "normal",
              fontSize: "medium",
              lineHeight: "normal",
              fontFamily: "sans-serif",
              fillOpacity: 1,
              strokeWidth: 1,
              strokeLinecap: "butt",
              strokeLinejoin: "miter",
              strokeMiterlimit: 4,
              paintOrder: "markers stroke fill",
            }}
            d="m 579.48242,680.41406 c -0.64762,0 -1.26084,0.18331 -1.83008,0.51953 -1.01469,0.5991 -1.89008,1.67869 -2.57422,3.04688 -0.0189,0.0404 -0.0405,0.0819 -0.0605,0.12305 0.29556,0.0302 0.59823,0.0673 0.9043,0.11718 0.9804,-1.88882 2.25589,-2.94726 3.56054,-2.94726 1.33761,0 2.64705,1.11246 3.63672,3.09179 0.48049,0.96099 0.87427,2.11357 1.1543,3.39649 0.35376,0.24491 0.69533,0.49544 1.02344,0.75195 -0.28838,-1.71639 -0.7738,-3.26045 -1.41016,-4.5332 -1.06791,-2.13574 -2.60222,-3.56641 -4.4043,-3.56641 z m 5.80274,3.84961 c -0.28476,-0.006 -0.57706,0.002 -0.875,0.0195 -0.0454,0.003 -0.091,0.006 -0.13672,0.01 0.12321,0.27023 0.23962,0.55187 0.34961,0.8418 2.12609,-0.0952 3.68163,0.47944 4.33398,1.60937 0.66883,1.15839 0.36009,2.84856 -0.85937,4.69531 -1.21932,1.84676 -3.31757,3.78534 -5.98633,5.32617 -2.66876,1.5408 -5.39844,2.3889 -7.60742,2.52149 -2.20899,0.13266 -3.82727,-0.44513 -4.4961,-1.60352 -0.65234,-1.12992 -0.37229,-2.76502 0.77344,-4.55859 -0.19616,-0.24038 -0.38031,-0.48088 -0.55273,-0.72266 -0.0261,0.0374 -0.0515,0.074 -0.0762,0.11133 -1.31565,1.99268 -1.78971,4.03698 -0.88867,5.59766 0.90104,1.56064 2.90945,2.17434 5.29297,2.03125 2.38356,-0.14325 5.21504,-1.03591 7.98438,-2.63477 2.76933,-1.59889 4.95774,-3.60497 6.27343,-5.59765 1.31566,-1.99265 1.78776,-4.03702 0.88672,-5.59766 -0.78841,-1.36556 -2.42275,-2.00604 -4.41601,-2.04883 z m -11.8418,0.01 c -1.0783,0.05 -2.04287,0.28055 -2.8125,0.71484 -0.5757,0.32504 -1.04336,0.76338 -1.36719,1.32422 -0.90104,1.56068 -0.42698,3.60498 0.88867,5.59766 0.78418,1.18764 1.87818,2.38023 3.22071,3.48828 -0.0582,-0.41227 -0.10548,-0.83309 -0.14063,-1.26172 -0.97141,-0.88415 -1.77114,-1.80238 -2.36328,-2.69922 -1.21931,-1.84675 -1.53011,-3.53693 -0.86133,-4.69531 0.66883,-1.15839 2.28711,-1.73415 4.4961,-1.60157 2.20898,0.13267 4.93862,0.98065 7.60742,2.52149 2.21473,1.27865 4.0345,2.83018 5.28711,4.37695 0.18746,-0.24151 0.36192,-0.48199 0.51953,-0.7207 0,0 0,-0.002 0,-0.002 -1.32234,-1.58363 -3.16313,-3.12028 -5.37695,-4.39844 -2.76934,-1.59889 -5.60082,-2.49171 -7.98438,-2.63477 -0.38173,-0.0229 -0.75385,-0.0264 -1.11328,-0.01 z m 9.48242,0.18554 c -1.0049,0.17462 -2.06516,0.46576 -3.14648,0.86914 0.38581,0.15572 0.77353,0.32609 1.16211,0.50977 0.81275,-0.2589 1.60239,-0.44807 2.34961,-0.56641 -0.11528,-0.28308 -0.23711,-0.55467 -0.36524,-0.81054 0,0 0,-0.002 0,-0.002 z m -8.43555,0.89649 c -0.71028,1.93704 -1.12109,4.30106 -1.12109,6.85742 0,2.55632 0.41085,4.92045 1.12109,6.85742 0,0 0.002,0 0.002,0 0.28573,-0.0189 0.57977,-0.0463 0.88281,-0.0879 -0.71323,-1.85817 -1.14648,-4.21215 -1.14648,-6.76953 0,-2.55749 0.43317,-4.91125 1.14648,-6.76953 -0.30312,-0.0416 -0.59719,-0.0705 -0.88281,-0.0879 0,0 -0.002,0 -0.002,0 z m 3.54883,0.71289 c -0.53741,0.25625 -1.07677,0.53988 -1.61328,0.84961 -0.53612,0.30954 -1.05051,0.63372 -1.54101,0.9707 -0.0839,0.39341 -0.15753,0.80007 -0.21875,1.2168 0.67566,-0.50691 1.4083,-0.99235 2.18945,-1.44336 0.78149,-0.4512 1.56859,-0.84409 2.3457,-1.17578 -0.39144,-0.15534 -0.77951,-0.29408 -1.16211,-0.41797 z m -4.66601,2.95898 c -0.89042,0.7349 -1.67217,1.50599 -2.32617,2.28907 0,0 0.002,0.002 0.002,0.002 0.1576,0.23887 0.33007,0.47927 0.51758,0.7207 0.47629,-0.5879 1.03513,-1.1757 1.66601,-1.75 0.034,-0.4286 0.0828,-0.84945 0.14063,-1.26172 z m 11.20898,0.56641 c 0.10129,0.83913 0.15625,1.71651 0.15625,2.61914 0,0.90221 -0.055,1.77844 -0.15625,2.61719 0.33033,-0.26155 0.64463,-0.5274 0.94336,-0.79688 0.0465,-0.59334 0.0723,-1.20115 0.0723,-1.82031 0,-0.61962 -0.0239,-1.2285 -0.0723,-1.82227 -0.29896,-0.26948 -0.61303,-0.53548 -0.94336,-0.79687 z m 4.15625,2.80664 c -0.17235,0.24151 -0.35658,0.48266 -0.55273,0.72266 1.14553,1.79346 1.42379,3.43069 0.77148,4.56054 -0.65235,1.12989 -2.208,1.7047 -4.33398,1.60938 -0.10999,0.28989 -0.2264,0.56968 -0.34961,0.83984 0.0457,0.003 0.0914,0.008 0.13672,0.008 2.38352,0.14287 4.38993,-0.46865 5.29101,-2.02929 0.90104,-1.56068 0.42897,-3.60498 -0.88672,-5.59766 -0.0264,-0.0378 -0.0505,-0.0755 -0.0762,-0.11328 z m -14.07226,2.91992 c 0.0612,0.41673 0.13484,0.82144 0.21875,1.21485 0.49073,0.33713 1.00458,0.66296 1.54101,0.97265 0.5362,0.30955 1.07415,0.59328 1.61133,0.84961 0.38268,-0.12397 0.77059,-0.26466 1.16211,-0.41992 -0.77692,-0.33184 -1.56252,-0.72278 -2.34375,-1.17383 -0.78153,-0.4512 -1.51356,-0.93622 -2.18945,-1.44336 z m 10.63086,0.5918 c -0.32807,0.25625 -0.66994,0.50723 -1.02344,0.75195 -0.28007,1.283 -0.67377,2.43543 -1.1543,3.39649 -0.98967,1.97934 -2.29914,3.09176 -3.63672,3.09179 -1.30465,-3e-5 -2.58014,-1.05848 -3.56054,-2.94726 -0.30615,0.0499 -0.60694,0.0888 -0.90235,0.11719 0.0189,0.0408 0.0386,0.0826 0.0586,0.12304 1.06787,2.13574 2.60222,3.56641 4.4043,3.56641 1.80208,0 3.33643,-1.43067 4.4043,-3.56641 0.63632,-1.27264 1.12185,-2.81703 1.41016,-4.5332 z m -4.35547,2.67578 c -0.38877,0.18369 -0.77607,0.35371 -1.16211,0.50977 1.08155,0.40357 2.14143,0.69437 3.14648,0.86914 0,0 0,-0.002 0,-0.002 0.12775,-0.25587 0.24996,-0.52731 0.36524,-0.81054 -0.74725,-0.11868 -1.53686,-0.3071 -2.34961,-0.56641 z"
            transform="scale(0.26458333)"
          />
          <path d="m 157.08576,180.81768 v 3.94352 c 0,0.53775 0.3585,1.07551 0.717,1.07551 h 1.79251 c 0.3585,0 0.71701,-0.53776 0.71701,-1.07551 v -3.94352 c 0,-0.35851 0,-0.35851 -0.35851,-0.35851 h -0.3585 c -0.3585,0 -0.3585,0 -0.3585,0.35851 v 3.94352 h -1.0755 v -3.94352 c 0,-0.35851 0,-0.35851 -0.35851,-0.35851 h -0.3585 c -0.3585,0 -0.3585,0 -0.3585,0.35851 z" />
          <path d="m 162.1048,180.45917 c -0.3585,0 -0.71701,0.53776 -0.71701,1.07551 v 3.94354 c 0,0.3585 -2e-5,0.35849 0.35848,0.35849 h 0.35853 c 0.35851,0 0.35849,1e-5 0.35849,-0.35849 v -1.79253 h 1.07551 v 1.79253 c 0,0.3585 -1e-5,0.35849 0.35849,0.35849 h 0.35853 c 0.3585,0 0.35848,1e-5 0.35849,-0.35849 v -3.94354 c 0,-0.53775 -0.35852,-1.07551 -0.71702,-1.07551 z m 0.35849,1.07551 h 1.07551 v 1.07551 h -1.07551 z" />
        </g>
      </g>
    </svg>
  );
};

export default Logo;
