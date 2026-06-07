'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { team as fallbackTeam } from '@/lib/data';
import TextReveal from '@/components/ui/TextReveal';

const techIcons: Record<string, string> = {
  "Figma": "M15.852 8.981h-4.588V0h4.588c2.476 0 4.49 2.014 4.49 4.49s-2.014 4.491-4.49 4.491zM12.735 7.51h3.117c1.665 0 3.019-1.355 3.019-3.019s-1.355-3.019-3.019-3.019h-3.117V7.51zm0 1.471H8.148c-2.476 0-4.49-2.014-4.49-4.49S5.672 0 8.148 0h4.588v8.981zm-4.587-7.51c-1.665 0-3.019 1.355-3.019 3.019s1.354 3.02 3.019 3.02h3.117V1.471H8.148zm4.587 15.019H8.148c-2.476 0-4.49-2.014-4.49-4.49s2.014-4.49 4.49-4.49h4.588v8.98zM8.148 8.981c-1.665 0-3.019 1.355-3.019 3.019s1.355 3.019 3.019 3.019h3.117V8.981H8.148zM8.172 24c-2.489 0-4.515-2.014-4.515-4.49s2.014-4.49 4.49-4.49h4.588v4.441c0 2.503-2.047 4.539-4.563 4.539zm-.024-7.51a3.023 3.023 0 0 0-3.019 3.019c0 1.665 1.365 3.019 3.044 3.019 1.705 0 3.093-1.376 3.093-3.068v-2.97H8.148zm7.704 0h-.098c-2.476 0-4.49-2.014-4.49-4.49s2.014-4.49 4.49-4.49h.098c2.476 0 4.49 2.014 4.49 4.49s-2.014 4.49-4.49 4.49zm-.097-7.509c-1.665 0-3.019 1.355-3.019 3.019s1.355 3.019 3.019 3.019h.098c1.665 0 3.019-1.355 3.019-3.019s-1.355-3.019-3.019-3.019h-.098z",
  "React": "M14.23 12.004a2.236 2.236 0 0 1-2.235 2.236 2.236 2.236 0 0 1-2.236-2.236 2.236 2.236 0 0 1 2.235-2.236 2.236 2.236 0 0 1 2.236 2.236zm2.648-10.69c-1.346 0-3.107.96-4.888 2.622-1.78-1.653-3.542-2.602-4.887-2.602-.41 0-.783.093-1.106.278-1.375.793-1.683 3.264-.973 6.365C1.98 8.917 0 10.42 0 12.004c0 1.59 1.99 3.097 5.043 4.03-.704 3.113-.39 5.588.988 6.38.32.187.69.275 1.102.275 1.345 0 3.107-.96 4.888-2.624 1.78 1.654 3.542 2.603 4.887 2.603.41 0 .783-.09 1.106-.275 1.374-.792 1.683-3.263.973-6.365C22.02 15.096 24 13.59 24 12.004c0-1.59-1.99-3.097-5.043-4.032.704-3.11.39-5.587-.988-6.38-.318-.184-.688-.277-1.092-.278zm-.005 1.09v.006c.225 0 .406.044.558.127.666.382.955 1.835.73 3.704-.054.46-.142.945-.25 1.44-.96-.236-2.006-.417-3.107-.534-.66-.905-1.345-1.727-2.035-2.447 1.592-1.48 3.087-2.292 4.105-2.295zm-9.77.02c1.012 0 2.514.808 4.11 2.28-.686.72-1.37 1.537-2.02 2.442-1.107.117-2.154.298-3.113.538-.112-.49-.195-.964-.254-1.42-.23-1.868.054-3.32.714-3.707.19-.09.4-.127.563-.132zm4.882 3.05c.455.468.91.992 1.36 1.564-.44-.02-.89-.034-1.345-.034-.46 0-.915.01-1.36.034.44-.572.895-1.096 1.345-1.565zM12 8.1c.74 0 1.477.034 2.202.093.406.582.802 1.203 1.183 1.86.372.64.71 1.29 1.018 1.946-.308.655-.646 1.31-1.013 1.95-.38.66-.773 1.288-1.18 1.87-.728.063-1.466.098-2.21.098-.74 0-1.477-.035-2.202-.093-.406-.582-.802-1.204-1.183-1.86-.372-.64-.71-1.29-1.018-1.946.303-.657.646-1.313 1.013-1.954.38-.66.773-1.286 1.18-1.868.728-.064 1.466-.098 2.21-.098zm-3.635.254c-.24.377-.48.763-.704 1.16-.225.39-.435.782-.635 1.174-.265-.656-.49-1.31-.676-1.947.64-.15 1.315-.283 2.015-.386zm7.26 0c.695.103 1.365.23 2.006.387-.18.632-.405 1.282-.66 1.933-.2-.39-.41-.783-.64-1.174-.225-.392-.465-.774-.705-1.146zm3.063.675c.484.15.944.317 1.375.498 1.732.74 2.852 1.708 2.852 2.476-.005.768-1.125 1.74-2.857 2.475-.42.18-.88.342-1.355.493-.28-.958-.646-1.956-1.1-2.98.45-1.017.81-2.01 1.085-2.964zm-13.395.004c.278.96.645 1.957 1.1 2.98-.45 1.017-.812 2.01-1.086 2.964-.484-.15-.944-.318-1.37-.5-1.732-.737-2.852-1.706-2.852-2.474 0-.768 1.12-1.742 2.852-2.476.42-.18.88-.342 1.356-.494zm11.678 4.28c.265.657.49 1.312.676 1.948-.64.157-1.316.29-2.016.39.24-.375.48-.762.705-1.158.225-.39.435-.788.636-1.18zm-9.945.02c.2.392.41.783.64 1.175.23.39.465.772.705 1.143-.695-.102-1.365-.23-2.006-.386.18-.63.406-1.282.66-1.933zM17.92 16.32c.112.493.2.968.254 1.423.23 1.868-.054 3.32-.714 3.708-.147.09-.338.128-.563.128-1.012 0-2.514-.807-4.11-2.28.686-.72 1.37-1.536 2.02-2.44 1.107-.118 2.154-.3 3.113-.54zm-11.83.01c.96.234 2.006.415 3.107.532.66.905 1.345 1.727 2.035 2.446-1.595 1.483-3.092 2.295-4.11 2.295-.22-.005-.406-.05-.553-.132-.666-.38-.955-1.834-.73-3.703.054-.46.142-.944.25-1.438zm4.56.64c.44.02.89.034 1.345.034.46 0 .915-.01 1.36-.034-.44.572-.895 1.095-1.345 1.565-.455-.47-.91-.993-1.36-1.565z",
  "Next.js": "M18.665 21.978C16.758 23.255 14.465 24 12 24 5.377 24 0 18.623 0 12S5.377 0 12 0s12 5.377 12 12c0 3.583-1.574 6.801-4.067 9.001L9.219 7.2H7.2v9.596h1.615V9.251l9.85 12.727Zm-3.332-8.533 1.6 2.061V7.2h-1.6v6.245Z",
  "Tailwind CSS": "M12.001,4.8c-3.2,0-5.2,1.6-6,4.8c1.2-1.6,2.6-2.2,4.2-1.8c0.913,0.228,1.565,0.89,2.288,1.624 C13.666,10.618,15.027,12,18.001,12c3.2,0,5.2-1.6,6-4.8c-1.2,1.6-2.6,2.2-4.2,1.8c-0.913-0.228-1.565-0.89-2.288-1.624 C16.337,6.182,14.976,4.8,12.001,4.8z M6.001,12c-3.2,0-5.2,1.6-6,4.8c1.2-1.6,2.6-2.2,4.2-1.8c0.913,0.228,1.565,0.89,2.288,1.624 c1.177,1.194,2.538,2.576,5.512,2.576c3.2,0,5.2-1.6,6-4.8c-1.2,1.6-2.6,2.2-4.2,1.8c-0.913-0.228-1.565-0.89-2.288-1.624 C10.337,13.382,8.976,12,6.001,12z",
  "TypeScript": "M1.125 0C.502 0 0 .502 0 1.125v21.75C0 23.498.502 24 1.125 24h21.75c.623 0 1.125-.502 1.125-1.125V1.125C24 .502 23.498 0 22.875 0zm17.363 9.75c.612 0 1.154.037 1.627.111a6.38 6.38 0 0 1 1.306.34v2.458a3.95 3.95 0 0 0-.643-.361 5.093 5.093 0 0 0-.717-.26 5.453 5.453 0 0 0-1.426-.2c-.3 0-.573.028-.819.086a2.1 2.1 0 0 0-.623.242c-.17.104-.3.229-.393.374a.888.888 0 0 0-.14.49c0 .196.053.373.156.529.104.156.252.304.443.444s.423.276.696.41c.273.135.582.274.926.416.47.197.892.407 1.266.628.374.222.695.473.963.753.268.279.472.598.614.957.142.359.214.776.214 1.253 0 .657-.125 1.21-.373 1.656a3.033 3.033 0 0 1-1.012 1.085 4.38 4.38 0 0 1-1.487.596c-.566.12-1.163.18-1.79.18a9.916 9.916 0 0 1-1.84-.164 5.544 5.544 0 0 1-1.512-.493v-2.63a5.033 5.033 0 0 0 3.237 1.2c.333 0 .624-.03.872-.09.249-.06.456-.144.623-.25.166-.108.29-.234.373-.38a1.023 1.023 0 0 0-.074-1.089 2.12 2.12 0 0 0-.537-.5 5.597 5.597 0 0 0-.807-.444 27.72 27.72 0 0 0-1.007-.436c-.918-.383-1.602-.852-2.053-1.405-.45-.553-.676-1.222-.676-2.005 0-.614.123-1.141.369-1.582.246-.441.58-.804 1.004-1.089a4.494 4.494 0 0 1 1.47-.629 7.536 7.536 0 0 1 1.77-.201zm-15.113.188h9.563v2.166H9.506v9.646H6.789v-9.646H3.375z",
  "Framer Motion": "M4 0h16v8h-8zM4 8h8l8 8H4zM4 16h8v8z",
  "Firebase": "M19.455 8.369c-.538-.748-1.778-2.285-3.681-4.569-.826-.991-1.535-1.832-1.884-2.245a146 146 0 0 0-.488-.576l-.207-.245-.113-.133-.022-.032-.01-.005L12.57 0l-.609.488c-1.555 1.246-2.828 2.851-3.681 4.64-.523 1.064-.864 2.105-1.043 3.176-.047.241-.088.489-.121.738-.209-.017-.421-.028-.632-.033-.018-.001-.035-.002-.059-.003a7.46 7.46 0 0 0-2.28.274l-.317.089-.163.286c-.765 1.342-1.198 2.869-1.252 4.416-.07 2.01.477 3.954 1.583 5.625 1.082 1.633 2.61 2.882 4.42 3.611l.236.095.071.025.003-.001a9.59 9.59 0 0 0 2.941.568q.171.006.342.006c1.273 0 2.513-.249 3.69-.742l.008.004.313-.145a9.63 9.63 0 0 0 3.927-3.335c1.01-1.49 1.577-3.234 1.641-5.042.075-2.161-.643-4.304-2.133-6.371m-7.083 6.695c.328 1.244.264 2.44-.191 3.558-1.135-1.12-1.967-2.352-2.475-3.665-.543-1.404-.87-2.74-.974-3.975.48.157.922.366 1.315.622 1.132.737 1.914 1.902 2.325 3.461zm.207 6.022c.482.368.99.712 1.513 1.028-.771.21-1.565.302-2.369.273a8 8 0 0 1-.373-.022c.458-.394.869-.823 1.228-1.279zm1.347-6.431c-.516-1.957-1.527-3.437-3.002-4.398-.647-.421-1.385-.741-2.194-.95.011-.134.026-.268.043-.4.014-.113.03-.216.046-.313.133-.689.332-1.37.589-2.025.099-.25.206-.499.321-.74l.004-.008c.177-.358.376-.719.61-1.105l.092-.152-.003-.001c.544-.851 1.197-1.627 1.942-2.311l.288.341c.672.796 1.304 1.548 1.878 2.237 1.291 1.549 2.966 3.583 3.612 4.48 1.277 1.771 1.893 3.579 1.83 5.375-.049 1.395-.461 2.755-1.195 3.933-.694 1.116-1.661 2.05-2.8 2.708-.636-.318-1.559-.839-2.539-1.599.79-1.575.952-3.28.479-5.072zm-2.575 5.397c-.725.939-1.587 1.55-2.09 1.856-.081-.029-.163-.06-.243-.093l-.065-.026c-1.49-.616-2.747-1.656-3.635-3.01-.907-1.384-1.356-2.993-1.298-4.653.041-1.19.338-2.327.882-3.379.316-.07.638-.114.96-.131l.084-.002c.162-.003.324-.003.478 0 .227.011.454.035.677.07.073 1.513.445 3.145 1.105 4.852.637 1.644 1.694 3.162 3.144 4.515z",
  "Node.js": "M11.998,24c-0.321,0-0.641-0.084-0.922-0.247l-2.936-1.737c-0.438-0.245-0.224-0.332-0.08-0.383 c0.585-0.203,0.703-0.25,1.328-0.604c0.065-0.037,0.151-0.023,0.218,0.017l2.256,1.339c0.082,0.045,0.197,0.045,0.272,0 l8.795-5.076 c0.082-0.047,0.134-0.141,0.134-0.238V6.921c0-0.099-0.053-0.192-0.137-0.242l-8.791-5.072c-0.081-0.047-0.189-0.047-0.271,0 L3.075,6.68C2.99,6.729,2.936,6.825,2.936,6.921v10.15c0,0.097,0.054,0.189,0.139,0.235l2.409,1.392 c1.307,0.654,2.108-0.116,2.108-0.89V7.787c0-0.142,0.114-0.253,0.256-0.253h1.115c0.139,0,0.255,0.112,0.255,0.253v10.021 c0,1.745-0.95,2.745-2.604,2.745c-0.508,0-0.909,0-2.026-0.551L2.28,18.675c-0.57-0.329-0.922-0.945-0.922-1.604V6.921 c0-0.659,0.353-1.275,0.922-1.603l8.795-5.082c0.557-0.315,1.296-0.315,1.848,0l8.794,5.082c0.57,0.329,0.924,0.944,0.924,1.603 v10.15c0,0.659-0.354,1.273-0.924,1.604l-8.794,5.078C12.643,23.916,12.324,24,11.998,24z M19.099,13.993 c0-1.9-1.284-2.406-3.987-2.763c-2.731-0.361-3.009-0.548-3.009-1.187c0-0.528,0.235-1.233,2.258-1.233 c1.807,0,2.473,0.389,2.747,1.607c0.024,0.115,0.129,0.199,0.247,0.199h1.141c0.071,0,0.138-0.031,0.186-0.081 c0.048-0.054,0.074-0.123,0.067-0.196c-0.177-2.098-1.571-3.076-4.388-3.076c-2.508,0-4.004,1.058-4.004,2.833 c0,1.925,1.488,2.457,3.895,2.695c2.88,0.282,3.103,0.703,3.103,1.269c0,0.983-0.789,1.402-2.642,1.402 c-2.327,0-2.839-0.584-3.011-1.742c-0.02-0.124-0.126-0.215-0.253-0.215h-1.137c-0.141,0-0.254,0.112-0.254,0.253 c0,1.482,0.806,3.248,4.655,3.248C17.501,17.007,19.099,15.91,19.099,13.993z",
  "Supabase": "M11.9 1.036c-.015-.986-1.26-1.41-1.874-.637L.764 12.05C-.33 13.427.65 15.455 2.409 15.455h9.579l.113 7.51c.014.985 1.259 1.408 1.873.636l9.262-11.653c1.093-1.375.113-3.403-1.645-3.403h-9.642z",
  "PostgreSQL": "M23.5594 14.7228a.5269.5269 0 0 0-.0563-.1191c-.139-.2632-.4768-.3418-1.0074-.2321-1.6533.3411-2.2935.1312-2.5256-.0191 1.342-2.0482 2.445-4.522 3.0411-6.8297.2714-1.0507.7982-3.5237.1222-4.7316a1.5641 1.5641 0 0 0-.1509-.235C21.6931.9086 19.8007.0248 17.5099.0005c-1.4947-.0158-2.7705.3461-3.1161.4794a9.449 9.449 0 0 0-.5159-.0816 8.044 8.044 0 0 0-1.3114-.1278c-1.1822-.0184-2.2038.2642-3.0498.8406-.8573-.3211-4.7888-1.645-7.2219.0788C.9359 2.1526.3086 3.8733.4302 6.3043c.0409.818.5069 3.334 1.2423 5.7436.4598 1.5065.9387 2.7019 1.4334 3.582.553.9942 1.1259 1.5933 1.7143 1.7895.4474.1491 1.1327.1441 1.8581-.7279.8012-.9635 1.5903-1.8258 1.9446-2.2069.4351.2355.9064.3625 1.39.3772a.0569.0569 0 0 0 .0004.0041 11.0312 11.0312 0 0 0-.2472.3054c-.3389.4302-.4094.5197-1.5002.7443-.3102.064-1.1344.2339-1.1464.8115-.0025.1224.0329.2309.0919.3268.2269.4231.9216.6097 1.015.6331 1.3345.3335 2.5044.092 3.3714-.6787-.017 2.231.0775 4.4174.3454 5.0874.2212.5529.7618 1.9045 2.4692 1.9043.2505 0 .5263-.0291.8296-.0941 1.7819-.3821 2.5557-1.1696 2.855-2.9059.1503-.8707.4016-2.8753.5388-4.1012.0169-.0703.0357-.1207.057-.1362.0007-.0005.0697-.0471.4272.0307a.3673.3673 0 0 0 .0443.0068l.2539.0223.0149.001c.8468.0384 1.9114-.1426 2.5312-.4308.6438-.2988 1.8057-1.0323 1.5951-1.6698zM2.371 11.8765c-.7435-2.4358-1.1779-4.8851-1.2123-5.5719-.1086-2.1714.4171-3.6829 1.5623-4.4927 1.8367-1.2986 4.8398-.5408 6.108-.13-.0032.0032-.0066.0061-.0098.0094-2.0238 2.044-1.9758 5.536-1.9708 5.7495-.0002.0823.0066.1989.0162.3593.0348.5873.0996 1.6804-.0735 2.9184-.1609 1.1504.1937 2.2764.9728 3.0892.0806.0841.1648.1631.2518.2374-.3468.3714-1.1004 1.1926-1.9025 2.1576-.5677.6825-.9597.5517-1.0886.5087-.3919-.1307-.813-.5871-1.2381-1.3223-.4796-.839-.9635-2.0317-1.4155-3.5126zm6.0072 5.0871c-.1711-.0428-.3271-.1132-.4322-.1772.0889-.0394.2374-.0902.4833-.1409 1.2833-.2641 1.4815-.4506 1.9143-1.0002.0992-.126.2116-.2687.3673-.4426a.3549.3549 0 0 0 .0737-.1298c.1708-.1513.2724-.1099.4369-.0417.156.0646.3078.26.3695.4752.0291.1016.0619.2945-.0452.4444-.9043 1.2658-2.2216 1.2494-3.1676 1.0128zm2.094-3.988-.0525.141c-.133.3566-.2567.6881-.3334 1.003-.6674-.0021-1.3168-.2872-1.8105-.8024-.6279-.6551-.9131-1.5664-.7825-2.5004.1828-1.3079.1153-2.4468.079-3.0586-.005-.0857-.0095-.1607-.0122-.2199.2957-.2621 1.6659-.9962 2.6429-.7724.4459.1022.7176.4057.8305.928.5846 2.7038.0774 3.8307-.3302 4.7363-.084.1866-.1633.3629-.2311.5454zm7.3637 4.5725c-.0169.1768-.0358.376-.0618.5959l-.146.4383a.3547.3547 0 0 0-.0182.1077c-.0059.4747-.054.6489-.115.8693-.0634.2292-.1353.4891-.1794 1.0575-.11 1.4143-.8782 2.2267-2.4172 2.5565-1.5155.3251-1.7843-.4968-2.0212-1.2217a6.5824 6.5824 0 0 0-.0769-.2266c-.2154-.5858-.1911-1.4119-.1574-2.5551.0165-.5612-.0249-1.9013-.3302-2.6462.0044-.2932.0106-.5909.019-.8918a.3529.3529 0 0 0-.0153-.1126 1.4927 1.4927 0 0 0-.0439-.208c-.1226-.4283-.4213-.7866-.7797-.9351-.1424-.059-.4038-.1672-.7178-.0869.067-.276.1831-.5875.309-.9249l.0529-.142c.0529-.16.134-.3257.213-.5012.4265-.9476 1.0106-2.2453.3766-5.1772-.2374-1.0981-1.0304-1.6343-2.2324-1.5098-.7207.0746-1.3799.3654-1.7088.5321a5.6716 5.6716 0 0 0-.1958.1041c.0918-1.1064.4386-3.1741 1.7357-4.4823a4.0306 4.0306 0 0 1 .3033-.276.3532.3532 0 0 0 .1447-.0644c.7524-.5706 1.6945-.8506 2.802-.8325.4091.0067.8017.0339 1.1742.081 1.939.3544 3.2439 1.4468 4.0359 2.3827.8143.9623 1.2552 1.9315 1.4312 2.4543-1.3232-.1346-2.2234.1268-2.6797.779-.9926 1.4189.543 4.1729 1.2811 5.4964.1353.2426.2522.4522.2889.5413.2403.5825.5515.9713.7787 1.2552.0696.087.1372.1714.1885.245-.4008.1155-1.1208.3825-1.0552 1.717-.0123.1563-.0423.4469-.0834.8148-.0461.2077-.0702.4603-.0994.7662zm.8905-1.6211c-.0405-.8316.2691-.9185.5967-1.0105a2.8566 2.8566 0 0 0 .135-.0406 1.202 1.202 0 0 0 .1342.103c.5703.3765 1.5823.4213 3.0068.1344-.2016.1769-.5189.3994-.9533.6011-.4098.1903-1.0957.333-1.7473.3636-.7197.0336-1.0859-.0807-1.1721-.151zm.5695-9.2712c-.0059.3508-.0542.6692-.1054 1.0017-.055.3576-.112.7274-.1264 1.1762-.0142.4368.0404.8909.0932 1.3301.1066.887.216 1.8003-.2075 2.7014a3.5272 3.5272 0 0 1-.1876-.3856c-.0527-.1276-.1669-.3326-.3251-.6162-.6156-1.1041-2.0574-3.6896-1.3193-4.7446.3795-.5427 1.3408-.5661 2.1781-.463zm.2284 7.0137a12.3762 12.3762 0 0 0-.0853-.1074l-.0355-.0444c.7262-1.1995.5842-2.3862.4578-3.4385-.0519-.4318-.1009-.8396-.0885-1.2226.0129-.4061.0666-.7543.1185-1.0911.0639-.415.1288-.8443.1109-1.3505.0134-.0531.0188-.1158.0118-.1902-.0457-.4855-.5999-1.938-1.7294-3.253-.6076-.7073-1.4896-1.4972-2.6889-2.0395.5251-.1066 1.2328-.2035 2.0244-.1859 2.0515.0456 3.6746.8135 4.8242 2.2824a.908.908 0 0 1 .0667.1002c.7231 1.3556-.2762 6.2751-2.9867 10.5405zm-8.8166-6.1162c-.025.1794-.3089.4225-.6211.4225a.5821.5821 0 0 1-.0809-.0056c-.1873-.026-.3765-.144-.5059-.3156-.0458-.0605-.1203-.178-.1055-.2844.0055-.0401.0261-.0985.0925-.1488.1182-.0894.3518-.1226.6096-.0867.3163.0441.6426.1938.6113.4186zm7.9305-.4114c.0111.0792-.049.201-.1531.3102-.0683.0717-.212.1961-.4079.2232a.5456.5456 0 0 1-.075.0052c-.2935 0-.5414-.2344-.5607-.3717-.024-.1765.2641-.3106.5611-.352.297-.0414.6111.0088.6356.1851z"
};

const techProtocols: Record<string, string> = {
  "Figma": "Protocol: Editorial wireframes aligned to a strict modular 12-column grid. Zero border-radii, mathematical layout restraint, precise typography grids.",
  "React": "Protocol: Component isolation utilizing declarative states. Infinite render prevention, optimal virtual DOM tree reconciliation, memoized selectors.",
  "Next.js": "Protocol: Next.js App Router orchestration. Strategic Server-Side Rendering (SSR), Incremental Static Regeneration (ISR), static layout caching.",
  "Tailwind CSS": "Protocol: Semantic CSS mapping utilizing strict Tailwind variables. Zero ad-hoc style classes, fluid typographic modular scales.",
  "TypeScript": "Protocol: Type-safe compile environments. Strict interface contracts, zero 'any' escapes, recursive readonly schemas.",
  "Framer Motion": "Protocol: Production-grade web choreographies. Custom cubic-bezier transition curves, low-overhead GPU accelerated layouts.",
  "Firebase": "Protocol: Serverless backend orchestration. Real-time data synchronization, secure user authentication schemas, and scalable cloud function execution.",
  "Node.js": "Protocol: High-throughput event-driven microservices. Minimal event-loop blocking, clean garbage collection, stateless worker threads.",
  "Supabase": "Protocol: Real-time cloud database routing. Strict Row Level Security (RLS) policies, programmatic DB access keys, edge function triggers.",
  "PostgreSQL": "Protocol: Highly optimized relational storage. Dynamic indexing, strict normalization, foreign key constraint isolation."
};

interface ChatMessage {
  sender: 'client' | 'marcus' | 'alex';
  avatar: string;
  name: string;
  text: string;
}

const chatScript: ChatMessage[] = [
  {
    sender: 'client',
    name: 'Brandon Chase',
    avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=100&h=100&q=80',
    text: "Hey!"
  },
  {
    sender: 'client',
    name: 'Brandon Chase',
    avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=100&h=100&q=80',
    text: "The website looks awesome"
  },
  {
    sender: 'client',
    name: 'Brandon Chase',
    avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=100&h=100&q=80',
    text: "Can we update the homepage banner?"
  },
  {
    sender: 'marcus',
    name: 'Marcus Vance',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=100&h=100&q=80',
    text: "Absolutely Brandon, systems are live. Let's push the new assets."
  },
  {
    sender: 'alex',
    name: 'Alex Sterling',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&h=100&q=80',
    text: "Updated! Edge CDN cache flushed. Reload and check it out!"
  },
  {
    sender: 'client',
    name: 'Brandon Chase',
    avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=100&h=100&q=80',
    text: "Holy speed scores! It's blistering fast."
  }
];

interface PricingBubble {
  id: number;
  label: string;
  size: number;
  duration: number;
  delay: number;
  left: string;
  sway: number;
}

// Bubble layout config — positions/sizes/timings
const BUBBLE_LAYOUT = [
  { size: 54, duration: 6.5, delay: 0.0, left: "12%", sway: 25 },
  { size: 64, duration: 8.0, delay: 1.8, left: "42%", sway: 35 },
  { size: 72, duration: 9.0, delay: 3.2, left: "68%", sway: 20 },
  { size: 60, duration: 6.0, delay: 0.9, left: "28%", sway: 40 },
  { size: 82, duration: 10.0, delay: 2.5, left: "78%", sway: 30 },
  { size: 76, duration: 10.5, delay: 4.8, left: "53%", sway: 25 },
];

// Fallback bubbles if no CMS data
const FALLBACK_BUBBLE_LABELS = ["₹3,500", "₹7,500", "₹12,500", "₹5,000", "₹15,000+", "CUSTOM"];

interface AboutClientProps {
  settings?: {
    title: string;
    subtitle: string;
    introHeading: string;
    introParagraph1: string;
    introParagraph2: string;
  };
  team?: any[];
  companyName?: string;
  companyReg?: string;
  servicePricing?: Array<{ id: string; serviceName: string; priceRange: string; features: string[]; imageUrl?: string; }>;
}

export default function AboutClient({ settings, team, companyName, companyReg, servicePricing }: AboutClientProps) {
  const displayCompanyName = companyName || "Vygrid Digital Studio";
  const displayCompanyReg = companyReg || "EST. 2026 • VYGRID STUDIO";
  const displayTeam = team || fallbackTeam;

  // Build pricing bubbles dynamically from CMS data
  const bubbleLabels: string[] = servicePricing && servicePricing.length > 0
    ? [
        ...servicePricing.slice(0, 5).map(item => item.priceRange.replace('From ', '').trim()),
        'CUSTOM'
      ]
    : FALLBACK_BUBBLE_LABELS;

  const pricingBubbles: PricingBubble[] = BUBBLE_LAYOUT.map((layout, i) => ({
    id: i + 1,
    label: bubbleLabels[i] ?? bubbleLabels[i % bubbleLabels.length],
    ...layout,
  }));

  // Dynamically filter developers (web, full stack, engineer, designer, programmer)
  const developers = displayTeam.filter(m => {
    const role = (m.role || "").toLowerCase();
    return role.includes("web") || role.includes("developer") || role.includes("engineer") || role.includes("stack") || role.includes("programmer") || role.includes("designer");
  });

  // Dynamically filter managers/leads (ceo, pm, manager, founder, director, etc.)
  const managers = displayTeam.filter(m => {
    const role = (m.role || "").toLowerCase();
    return role.includes("ceo") || role.includes("pm") || role.includes("manager") || role.includes("founder") || role.includes("director") || role.includes("lead");
  });

  // Resolve developers and managers dynamically with robust index fallbacks
  const dev1Resolved = developers[0] || displayTeam[0];
  const dev2Resolved = developers[1] || displayTeam[1];
  const devForDeployment = developers[2] || developers[1] || displayTeam[1]; // Use 3rd developer if available
  const pmResolved = managers[0] || displayTeam[2] || displayTeam[0];

  const dev1Label = dev1Resolved?.name || "Jerrin Joseph";
  const dev1Img = dev1Resolved?.image || 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&h=300&q=100';

  const dev2Label = dev2Resolved?.name || "Christo Philip Mathew";
  const dev2Img = dev2Resolved?.image || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&h=300&q=100';

  const devDeploymentLabel = devForDeployment?.name || "Christo Philip Mathew";
  const devDeploymentImg = devForDeployment?.image || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&h=300&q=100';

  const pmLabel = pmResolved?.name || "Madhav MP";
  const pmImg = pmResolved?.image || 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=300&h=300&q=100';

  // Fixed fictional client persona — always external, never a team member
  const clientName = "Brandon Chase";
  const clientAvatar = 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=100&h=100&q=80';

  const chatScript = [
    {
      sender: 'client',
      name: clientName,
      avatar: clientAvatar,
      text: "Hey team! How's the progress on the portfolio's React deployment?"
    },
    {
      sender: 'client',
      name: clientName,
      avatar: clientAvatar,
      text: "We need the dynamic project routes live by tonight."
    },
    {
      sender: 'client',
      name: clientName,
      avatar: clientAvatar,
      text: "Also make sure we optimize the spotlight images and fit them to the grid."
    },
    {
      sender: 'marcus',
      name: dev1Label,
      avatar: dev1Img,
      text: `On it Brandon! Just optimized all asset components to use contain fit. Compiling the build now.`
    },
    {
      sender: 'alex',
      name: devDeploymentLabel,
      avatar: devDeploymentImg,
      text: "Production build deployed and Edge CDN cache flushed. Reload and check it out!"
    },
    {
      sender: 'client',
      name: clientName,
      avatar: clientAvatar,
      text: "Holy speed scores! The page loads instantly and the layout fits beautifully."
    }
  ];

  const convictions = [
    {
      num: "I.",
      title: "Precision Engineering",
      description: "We are obsessed with pixel measurements, layout boundaries, speed benchmarks, and stable web architectures."
    },
    {
      num: "II.",
      title: "Creative Integrity",
      description: "We never take visual shortcuts. Our identity design frameworks are mathematically precise and strategically positioned."
    },
    {
      num: "III.",
      title: "Active Partnership",
      description: "We work directly as an extension of your growth team, ensuring design assets support real-world commercial results."
    }
  ];

  const methodology = [
    {
      step: "01",
      title: "DISCOVERY",
      description: "We dig deep into your product metrics, market challenges, user profiles, and design preferences before drawing a single grid line."
    },
    {
      step: "02",
      title: "DESIGN",
      description: "We construct high-fidelity visual guidelines, responsive design structures, custom typography monograms, and wireframes."
    },
    {
      step: "03",
      title: "DEVELOP",
      description: "Our engineers build using Next.js App Router, TypeScript, and Framer Motion, securing fast loading times and pristine code structures."
    },
    {
      step: "04",
      title: "DELIVER",
      description: "We audit performance, secure metadata tags, deploy on Vercel Edge Networks, and coordinate strategic launch blueprints."
    }
  ];

  const techStack = [
    "Figma", "React", "Next.js", "Tailwind CSS", "TypeScript",
    "Framer Motion", "Firebase", "Node.js", "Supabase", "PostgreSQL"
  ];

  // Section 02 - Sequenced Dialogue Chat Panel States
  const [visibleMessages, setVisibleMessages] = useState<ChatMessage[]>([]);
  const [typingFor, setTypingFor] = useState<string | null>(null);
  const [relayStatus, setRelayStatus] = useState<'ROUTING...' | 'TRANSMITTING...' | 'ACTIVE'>('ACTIVE');

  useEffect(() => {
    const timers: NodeJS.Timeout[] = [];
    
    const runDialogueSequence = () => {
      setVisibleMessages([]);
      setTypingFor(null);
      setRelayStatus('ROUTING...');

      const schedule = (fn: () => void, delay: number) => {
        timers.push(setTimeout(fn, delay));
      };

      // 1. Client starts typing
      schedule(() => {
        setTypingFor('client');
      }, 500);

      // 2. Client sends "Hey!"
      schedule(() => {
        setTypingFor(null);
        setRelayStatus('TRANSMITTING...');
        setVisibleMessages(prev => [...prev, chatScript[0]]);
      }, 2000);

      // 3. Client starts typing again
      schedule(() => {
        setTypingFor('client');
        setRelayStatus('ROUTING...');
      }, 2800);

      // 4. Client sends "The website looks awesome"
      schedule(() => {
        setTypingFor(null);
        setRelayStatus('TRANSMITTING...');
        setVisibleMessages(prev => [...prev, chatScript[1]]);
      }, 4300);

      // 5. Client starts typing third message
      schedule(() => {
        setTypingFor('client');
        setRelayStatus('ROUTING...');
      }, 5100);

      // 6. Client sends "Can we update the homepage banner?"
      schedule(() => {
        setTypingFor(null);
        setRelayStatus('TRANSMITTING...');
        setVisibleMessages(prev => [...prev, chatScript[2]]);
      }, 6600);

      // 7. Marcus starts typing
      schedule(() => {
        setTypingFor('marcus');
        setRelayStatus('ROUTING...');
      }, 7600);

      // 8. Marcus sends "Absolutely Brandon, systems are live. Let's push the new assets."
      schedule(() => {
        setTypingFor(null);
        setRelayStatus('TRANSMITTING...');
        setVisibleMessages(prev => [...prev, chatScript[3]]);
      }, 9800);

      // 9. Alex starts typing
      schedule(() => {
        setTypingFor('alex');
        setRelayStatus('ROUTING...');
      }, 10800);

      // 10. Alex sends "Updated! Edge CDN cache flushed. Reload and check it out!"
      schedule(() => {
        setTypingFor(null);
        setRelayStatus('TRANSMITTING...');
        setVisibleMessages(prev => [...prev, chatScript[4]]);
      }, 13200);

      // 11. Client starts typing final response
      schedule(() => {
        setTypingFor('client');
        setRelayStatus('ROUTING...');
      }, 14200);

      // 12. Client sends "Holy speed scores! It's blistering fast."
      schedule(() => {
        setTypingFor(null);
        setRelayStatus('TRANSMITTING...');
        setVisibleMessages(prev => [...prev, chatScript[5]]);
      }, 15800);

      // 13. End of loop delay before resetting
      schedule(() => {
        setRelayStatus('ACTIVE');
      }, 16500);
    };

    runDialogueSequence();
    const mainInterval = setInterval(runDialogueSequence, 21500);

    return () => {
      clearInterval(mainInterval);
      timers.forEach(clearTimeout);
    };
  }, []);

  // Section 06 - Stack tag active states
  const [activeTech, setActiveTech] = useState<string>("React");

  return (
    <div className="relative w-full bg-[#0A0A0A] text-[#F5F0EB] py-12 md:py-24 space-y-24 md:space-y-36 selection:bg-[#C8B89A] selection:text-[#0A0A0A]">
      {/* Back Button */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 pt-4">
        <Link
          href="/"
          className="inline-flex items-center space-x-2 font-mono text-[10px] uppercase tracking-widest text-[#888888] hover:text-[#C8B89A] transition-colors duration-300"
        >
          <span>← BACK</span>
        </Link>
      </div>

      {/* Section 01 / INTRODUCTION (Hero Area) */}
      <section className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="space-y-6 md:space-y-8 max-w-4xl">
          <span className="font-mono text-[10px] md:text-xs tracking-[0.2em] text-[#888888] block uppercase">
            01 / INTRODUCTION
          </span>
          <h1 className="font-serif italic text-3xl sm:text-5xl md:text-7xl lg:text-8xl text-[#F5F0EB] tracking-tight leading-[1.05] font-light">
            <TextReveal text={settings?.introHeading || "Grid by grid. Pixel by pixel. Rebuilding the visual legacy."} />
          </h1>
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1], delay: 0.4 }}
            className="font-grotesque text-sm sm:text-base md:text-lg text-[#888888] font-light leading-relaxed max-w-2xl"
          >
            {settings?.introParagraph1 || `${displayCompanyName} is a high-end digital studio merging structured programming with world-class identity design. In a web saturated with generic templates and bloated codebases, we serve as architects of visual restraint and computational performance. We eliminate rounded corners, decorative gradients, and unnecessary UI chrome.`}
            {settings?.introParagraph2 && (
              <span className="block mt-4">{settings.introParagraph2}</span>
            )}
          </motion.p>
        </div>
      </section>

      {/* Section 02 / WHY WORK WITH US (Asymmetric Multi-Interactive Grid) */}
      <section className="max-w-7xl mx-auto px-6 md:px-12 space-y-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-white/10 pb-6 gap-4">
          <div className="space-y-2.5">
            <span className="font-mono text-[10px] tracking-[0.2em] text-[#C8B89A] uppercase block">
              02 / WHY WORK WITH US
            </span>
            <h2 className="font-serif italic text-3xl md:text-5xl text-[#F5F0EB]">
              Why work with Us
            </h2>
            <p className="font-grotesque text-sm text-[#888888] font-light max-w-xl">
              Precision team mechanics, live feedback dialogues, and transparent commercial structures.
            </p>
          </div>
        </div>

        {/* 3-Panel Asymmetric Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* A. Studio Cohesion Panel (Left - Span 6) */}
          <div className="lg:col-span-6 border border-white/10 bg-[#111111]/30 p-8 sm:p-12 flex flex-col justify-between items-center relative overflow-hidden min-h-[450px]">
            <span className="absolute top-8 left-8 font-mono text-[9px] tracking-widest text-[#888888] uppercase">
              STUDIO COHESION
            </span>

            {/* Orbiting graphic container */}
            <div className="relative w-full aspect-square max-w-[340px] flex items-center justify-center my-auto">
              
              {/* Outer Orbit Circle (Clockwise, 50s) */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 50, repeat: Infinity, ease: "linear" }}
                className="absolute w-[280px] h-[280px] border border-white/5 rounded-full flex items-center justify-center"
              >
                {/* Avatars on Outer Orbit with Counter-Rotation to stay upright */}
                {displayTeam[0] && (
                  <motion.div 
                    animate={{ rotate: -360 }}
                    transition={{ duration: 50, repeat: Infinity, ease: "linear" }}
                    className="absolute -top-5 left-[50%] -translate-x-[50%] w-10 h-10 overflow-hidden border border-white/10 bg-[#1A1A1A]"
                  >
                    <Image src={displayTeam[0].image} alt={displayTeam[0].name} fill className="object-cover" />
                  </motion.div>
                )}
                {displayTeam[1] && (
                  <motion.div 
                    animate={{ rotate: -360 }}
                    transition={{ duration: 50, repeat: Infinity, ease: "linear" }}
                    className="absolute -bottom-5 left-[50%] -translate-x-[50%] w-10 h-10 overflow-hidden border border-white/10 bg-[#1A1A1A]"
                  >
                    <Image src={displayTeam[1].image} alt={displayTeam[1].name} fill className="object-cover" />
                  </motion.div>
                )}
                {displayTeam[2] && (
                  <motion.div 
                    animate={{ rotate: -360 }}
                    transition={{ duration: 50, repeat: Infinity, ease: "linear" }}
                    className="absolute top-[50%] -left-5 -translate-y-[50%] w-10 h-10 overflow-hidden border border-white/10 bg-[#1A1A1A]"
                  >
                    <Image src={displayTeam[2].image} alt={displayTeam[2].name} fill className="object-cover" />
                  </motion.div>
                )}
              </motion.div>

              {/* Inner Orbit Circle (Counter-Clockwise, 35s) */}
              <motion.div
                animate={{ rotate: -360 }}
                transition={{ duration: 35, repeat: Infinity, ease: "linear" }}
                className="absolute w-[180px] h-[180px] border border-white/5 rounded-full flex items-center justify-center"
              >
                {/* Avatars on Inner Orbit with Counter-Rotation to stay upright */}
                {displayTeam[3] && (
                  <motion.div 
                    animate={{ rotate: 360 }}
                    transition={{ duration: 35, repeat: Infinity, ease: "linear" }}
                    className="absolute -top-4 left-[50%] -translate-x-[50%] w-8 h-8 overflow-hidden border border-white/10 bg-[#1A1A1A]"
                  >
                    <Image src={displayTeam[3].image} alt={displayTeam[3].name} fill className="object-cover" />
                  </motion.div>
                )}
                {displayTeam[4] && (
                  <motion.div 
                    animate={{ rotate: 360 }}
                    transition={{ duration: 35, repeat: Infinity, ease: "linear" }}
                    className="absolute -bottom-4 left-[50%] -translate-x-[50%] w-8 h-8 overflow-hidden border border-white/10 bg-[#1A1A1A]"
                  >
                    <Image src={displayTeam[4].image} alt={displayTeam[4].name} fill className="object-cover" />
                  </motion.div>
                )}
                {displayTeam[5] && (
                  <motion.div 
                    animate={{ rotate: 360 }}
                    transition={{ duration: 35, repeat: Infinity, ease: "linear" }}
                    className="absolute top-[50%] -right-4 -translate-y-[50%] w-8 h-8 overflow-hidden border border-white/10 bg-[#1A1A1A]"
                  >
                    <Image src={displayTeam[5].image} alt={displayTeam[5].name} fill className="object-cover" />
                  </motion.div>
                )}
              </motion.div>

              {/* Centered Typography Block */}
              <div className="absolute text-center z-10 px-6 max-w-[200px]">
                <h3 className="font-serif italic text-2xl text-[#F5F0EB] tracking-tight leading-tight select-none">
                  A strong team of experts
                </h3>
              </div>

            </div>
          </div>

          {/* Right Panels Wrapper: Span 6 stacks vertically */}
          <div className="lg:col-span-6 flex flex-col gap-8 justify-between">
            
            {/* B. Testimonial Dialogue Chat Panel (Top-Right - Span 6) */}
            <div className="border border-white/5 bg-[#E5E2DB] p-8 sm:p-10 pt-16 flex flex-col justify-center relative min-h-[300px] overflow-hidden select-none text-[#0A0A0A]">
              
              {/* Gold Terminal Protocol Banner */}
              <div className="absolute top-0 left-0 right-0 h-10 border-b border-black/5 bg-[#E5E2DB] flex items-center justify-between px-6">
                <div className="flex items-center space-x-2">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#C8B89A] opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-[#C8B89A]"></span>
                  </span>
                  <span className="font-mono text-[9px] tracking-widest text-[#0A0A0A] font-bold">
                    PROTOCOL: {relayStatus}
                  </span>
                </div>
                <span className="font-mono text-[8px] tracking-widest text-[#0A0A0A]/40 uppercase select-none">
                  SYSTEM LIVE
                </span>
                
                {/* Infinite sliding gradient line */}
                <div className="absolute bottom-0 left-0 right-0 h-[1.5px] overflow-hidden">
                  <motion.div
                    initial={{ x: "-100%" }}
                    animate={{ x: "100%" }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: "linear"
                    }}
                    className="w-full h-full bg-gradient-to-r from-transparent via-[#C8B89A] to-transparent"
                  />
                </div>
              </div>

              {/* Chat messages viewport */}
              <div className="space-y-4 pt-4 max-h-[220px] overflow-y-auto no-scrollbar flex flex-col justify-end">
                <AnimatePresence>
                  {visibleMessages.map((msg, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 15, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                      className={`flex items-end space-x-3 max-w-[85%] ${
                        msg.sender !== 'client' ? 'self-end flex-row-reverse space-x-reverse' : 'self-start'
                      }`}
                    >
                      {/* Avatar */}
                      <div className="relative w-8 h-8 overflow-hidden bg-white/20 border border-black/10 flex-shrink-0">
                        <Image
                          src={msg.avatar}
                          alt={msg.name}
                          fill
                          sizes="32px"
                          quality={100}
                          className="object-cover"
                        />
                      </div>
                      
                      {/* Bubble with Name Label */}
                      <div className="space-y-0.5">
                        <span className={`block font-mono text-[7px] uppercase tracking-wider text-[#0A0A0A]/50 ${
                          msg.sender !== 'client' ? 'text-right' : 'text-left'
                        }`}>
                          {msg.name}
                        </span>
                        <div className={`px-4 py-2 text-xs sm:text-sm font-grotesque font-light shadow-sm leading-relaxed ${
                          msg.sender === 'client'
                            ? 'bg-white rounded-[16px] rounded-bl-none text-[#0A0A0A]'
                            : 'bg-[#C8B89A] rounded-[16px] rounded-br-none text-[#0A0A0A] font-medium'
                        }`}>
                          {msg.text}
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
 
                {/* Bouncing Typing Indicator */}
                {typingFor && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`flex items-end space-x-3 max-w-[85%] ${
                      typingFor !== 'client' ? 'self-end flex-row-reverse space-x-reverse' : 'self-start'
                    }`}
                  >
                    <div className="relative w-8 h-8 overflow-hidden bg-white/20 border border-black/10 flex-shrink-0">
                      <Image
                        src={
                          typingFor === 'client'
                            ? clientAvatar
                            : typingFor === 'marcus'
                            ? dev1Img
                            : devDeploymentImg
                        }
                        alt="Typing Member"
                        fill
                        sizes="32px"
                        quality={100}
                        className="object-cover"
                      />
                    </div>
                    
                    <div className="flex space-x-1.5 items-center bg-white px-4 py-3 rounded-[16px] rounded-bl-none shadow-sm w-fit">
                      {[0, 1, 2].map((i) => (
                        <motion.span
                          key={i}
                          animate={{ y: [0, -4, 0] }}
                          transition={{
                            duration: 0.8,
                            repeat: Infinity,
                            ease: "easeInOut",
                            delay: i * 0.15,
                          }}
                          className="w-1.5 h-1.5 bg-[#C8B89A] rounded-full"
                        />
                      ))}
                    </div>
                  </motion.div>
                )}
              </div>
            </div>

            {/* C. Transparent Pricing CTA Panel (Bottom-Right - Span 6) */}
            <div className="border border-white/10 bg-[#111111]/30 p-8 sm:p-10 flex flex-col justify-between relative min-h-[220px] select-none overflow-hidden">
              
              {/* Floating Upward Price Bubbles using custom SVGs (bypasses border-radius limits) */}
              <div className="absolute inset-0 pointer-events-none overflow-hidden">
                {pricingBubbles.map((b) => (
                  <motion.div
                    key={b.id}
                    initial={{ y: "220%", x: 0, opacity: 0 }}
                    animate={{
                      y: "-120%",
                      opacity: [0, 0.45, 0.45, 0],
                      x: [0, b.sway, -b.sway, 0]
                    }}
                    transition={{
                      duration: b.duration,
                      delay: b.delay,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                    style={{
                      left: b.left,
                      width: b.size,
                      height: b.size,
                    }}
                    className="absolute flex items-center justify-center font-mono text-[9px] font-bold text-[#C8B89A]"
                  >
                    <svg viewBox="0 0 100 100" className="absolute inset-0 w-full h-full text-[#C8B89A]/30">
                      <circle cx="50" cy="50" r="46" fill="rgba(200, 184, 154, 0.05)" stroke="currentColor" strokeWidth="2" />
                    </svg>
                    <span className="relative z-10">{b.label}</span>
                  </motion.div>
                ))}
              </div>

              {/* Header inside Panel */}
              <div className="flex justify-between items-start gap-4 z-10">
                <h3 className="font-serif italic text-2xl sm:text-3xl text-[#F5F0EB] tracking-tight leading-tight max-w-[200px]">
                  Transparent pricing model
                </h3>
                
                {/* Pill Button Top-Right */}
                <Link
                  href="/pricing"
                  className="px-3.5 py-1.5 border border-white/20 hover:border-[#C8B89A] hover:text-[#C8B89A] bg-[#111111]/80 rounded-full font-mono text-[9px] font-bold uppercase tracking-widest transition-all duration-300 flex items-center space-x-1.5 flex-shrink-0"
                >
                  <span>View pricing</span>
                  <span className="w-1.5 h-1.5 bg-[#C8B89A] rounded-full animate-ping" />
                </Link>
              </div>

            </div>

          </div>

        </div>
      </section>

      {/* Section 03 / CORE PHILOSOPHY */}
      <section className="max-w-7xl mx-auto px-6 md:px-12 space-y-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-white/10 pb-6 gap-4">
          <div className="space-y-2">
            <span className="font-mono text-[10px] tracking-[0.2em] text-[#888888] block uppercase">
              03 / CORE PHILOSOPHY
            </span>
            <h2 className="font-serif italic text-3xl md:text-4xl text-[#F5F0EB]">
              What We Hold True
            </h2>
          </div>
          <span className="font-mono text-[10px] text-[#888888] max-w-[280px] leading-relaxed">
            Restraint is the ultimate form of digital elegance. We guide brands toward typographic clarity.
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-0 border border-white/10 divide-y md:divide-y-0 md:divide-x divide-white/10">
          {convictions.map((val, idx) => (
            <div key={idx} className="p-8 md:p-10 space-y-6 bg-[#111111]/30 hover:bg-[#111111]/70 transition-colors duration-500">
              <span className="font-mono text-xs text-[#C8B89A] font-bold block">
                {val.num}
              </span>
              <h3 className="font-grotesque font-bold text-sm tracking-wider uppercase text-[#F5F0EB]">
                {val.title}
              </h3>
              <p className="font-grotesque text-sm text-[#888888] font-light leading-relaxed">
                {val.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Section 04 / EXECUTION PATH (Methodology) */}
      <section className="max-w-7xl mx-auto px-6 md:px-12 space-y-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-white/10 pb-6 gap-4">
          <div className="space-y-2">
            <span className="font-mono text-[10px] tracking-[0.2em] text-[#888888] block uppercase">
              04 / EXECUTION PATH
            </span>
            <h2 className="font-serif italic text-3xl md:text-4xl text-[#F5F0EB]">
              Methodology
            </h2>
          </div>
          <span className="font-mono text-[10px] text-[#888888]">
            FOUR-STEP BLUEPRINT TO DEPLOYMENT
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {methodology.map((step, idx) => (
            <div key={idx} className="border border-white/10 bg-[#111111] p-8 space-y-6 flex flex-col justify-between group hover:border-[#C8B89A] transition-colors duration-500">
              <div className="space-y-4">
                <span className="font-mono text-2xl font-light text-[#444444] group-hover:text-[#C8B89A] transition-colors duration-500 block leading-none">
                  {step.step}
                </span>
                <h3 className="font-mono text-xs font-bold tracking-widest text-[#F5F0EB] uppercase">
                  {step.title}
                </h3>
              </div>
              <p className="font-grotesque text-xs text-[#888888] font-light leading-relaxed">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Section 05 / DIRECTORS (Meet The Founders) */}
      <section className="max-w-7xl mx-auto px-6 md:px-12 space-y-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-white/10 pb-6 gap-4">
          <div className="space-y-2">
            <span className="font-mono text-[10px] tracking-[0.2em] text-[#888888] block uppercase">
              05 / DIRECTORS
            </span>
            <h2 className="font-serif italic text-3xl md:text-4xl text-[#F5F0EB]">
              Meet The Founders
            </h2>
          </div>
          <span className="font-mono text-[10px] text-[#888888] max-w-[280px] leading-relaxed">
            Creative architects and software engineers obsessed with modular layouts.
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {displayTeam.map((member, idx) => (
            <div key={idx} className="border border-white/10 bg-[#111111] p-6 space-y-6 flex flex-col justify-between group hover:border-white/20 transition-all duration-300">
              <div className="space-y-4">
                <div className="relative aspect-square w-full bg-[#1A1A1A] overflow-hidden border border-white/5">
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    className="object-cover transition-all duration-700 group-hover:scale-105 group-hover:brightness-95"
                    sizes="(max-w-768px) 100vw, 250px"
                  />
                </div>
                <div className="space-y-1">
                  <h3 className="font-grotesque font-bold text-sm tracking-wide uppercase text-[#F5F0EB]">
                    {member.name}
                  </h3>
                  <span className="font-mono text-[9px] text-[#C8B89A] uppercase tracking-widest block">
                    {member.role}
                  </span>
                </div>
                <p className="font-grotesque text-xs text-[#888888] font-light leading-relaxed">
                  {member.bio}
                </p>
              </div>

              <div className="flex items-center space-x-4 pt-4 border-t border-white/5 font-mono text-[9px] tracking-wider text-[#888888]">
                {member.socials.linkedin && (
                  <a
                    href={member.socials.linkedin}
                    className="hover:text-[#C8B89A] transition-colors relative after:absolute after:bottom-0 after:left-0 after:w-0 hover:after:w-full after:h-[1px] after:bg-[#C8B89A] after:transition-all after:duration-300"
                  >
                    LINKEDIN
                  </a>
                )}
                {member.socials.twitter && (
                  <a
                    href={member.socials.twitter}
                    className="hover:text-[#C8B89A] transition-colors relative after:absolute after:bottom-0 after:left-0 after:w-0 hover:after:w-full after:h-[1px] after:bg-[#C8B89A] after:transition-all after:duration-300"
                  >
                    TWITTER
                  </a>
                )}
                {member.socials.github && (
                  <a
                    href={member.socials.github}
                    className="hover:text-[#C8B89A] transition-colors relative after:absolute after:bottom-0 after:left-0 after:w-0 hover:after:w-full after:h-[1px] after:bg-[#C8B89A] after:transition-all after:duration-300"
                  >
                    GITHUB
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Section 06 / INFRASTRUCTURE (Development Stack) */}
      <section className="max-w-7xl mx-auto px-6 md:px-12 space-y-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-white/10 pb-6 gap-4">
          <div className="space-y-2">
            <span className="font-mono text-[10px] tracking-[0.2em] text-[#888888] block uppercase">
              06 / INFRASTRUCTURE
            </span>
            <h2 className="font-serif italic text-3xl md:text-4xl text-[#F5F0EB]">
              Development Stack
            </h2>
          </div>
          <span className="font-mono text-[10px] text-[#888888]">
            PRODUCTION STANDARDS AND PROTOCOLS
          </span>
        </div>

        {/* Tech Stack Interactive tag list */}
        <div className="space-y-6">
          <div className="flex flex-wrap gap-3 max-w-4xl">
            {techStack.map((tech) => {
              const path = techIcons[tech];
              const isActive = activeTech === tech;
              return (
                <button
                  key={tech}
                  onClick={() => setActiveTech(tech)}
                  onMouseEnter={() => setActiveTech(tech)}
                  className={`font-mono text-xs border px-4 py-2 bg-[#111111] transition-all duration-300 select-none cursor-pointer flex items-center space-x-2 ${
                    isActive
                      ? 'border-[#C8B89A] text-[#C8B89A] shadow-[0_0_15px_rgba(200,184,154,0.15)]'
                      : 'border-white/10 text-[#888888] hover:border-[#C8B89A] hover:text-[#C8B89A]'
                  }`}
                >
                  {path && (
                    <svg 
                      className={`w-3.5 h-3.5 fill-current ${
                        tech === 'React' && isActive ? 'animate-[spin_4s_linear_infinite]' : ''
                      }`} 
                      viewBox="0 0 24 24" 
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d={path} />
                    </svg>
                  )}
                  <span>{tech}</span>
                </button>
              );
            })}
          </div>

          {/* Active Protocol Detail Card Console */}
          <div className="border border-[#C8B89A]/20 bg-[#111111]/70 p-6 font-mono text-left relative max-w-4xl">
            <div className="absolute top-2 right-4 flex space-x-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-red-500/30" />
              <span className="w-1.5 h-1.5 rounded-full bg-yellow-500/30" />
              <span className="w-1.5 h-1.5 rounded-full bg-green-500/30" />
            </div>
            
            <span className="text-[9px] text-[#C8B89A] block mb-3 font-bold tracking-widest">
              VYGRID PROTOCOL CONSOLE // ACTIVE_NODE: {activeTech.toUpperCase()}
            </span>
            
            <div className="text-xs text-[#888888] leading-relaxed min-h-[40px] select-text">
              <AnimatePresence mode="wait">
                <motion.p
                  key={activeTech}
                  initial={{ opacity: 0, x: 8 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -8 }}
                  transition={{ duration: 0.25 }}
                >
                  {techProtocols[activeTech]}
                </motion.p>
              </AnimatePresence>
            </div>
          </div>

        </div>
      </section>
    </div>
  );
}
