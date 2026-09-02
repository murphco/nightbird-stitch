import { TagEntity } from '../types';

export const INITIAL_TAGS: TagEntity[] = [
  {
    id: 'tag-1',
    identifier: '#OFFSHORE_ACCT_TRX',
    category: 'FINANCIAL',
    occurrences: 1042,
    weight: 90,
    patternDetect: 'HIGH',
    status: 'ACTIVE',
    lastDetected: '2026-09-01 19:42:04 UTC',
    firstDetected: '2024-03-11 08:15:00 UTC',
    description: 'High-frequency transactions across offshore banking jurisdictions (Cayman, Nauru, Zurich) routed through multi-layered shell LLCs.',
    sourceEvidence: [
      { id: 'FIN-8821-SWIFT', title: 'SWIFT Wire Transfer Log batch #992', type: 'TRANSACTION', timestamp: '2026-08-30' },
      { id: 'BANK-CY-014', title: 'Cyprus Bank Account Ledger Statement', type: 'DOCUMENT', timestamp: '2026-08-28' },
      { id: 'DOC-PANAMA-LEAK', title: 'Beneficiary Ownership Trust Agreement', type: 'DOCUMENT', timestamp: '2026-08-15' }
    ],
    linkedEntities: ['SUBJECT-OMEGA', 'CYRUS_HOLDINGS_LLC', 'VALIANT_CORP_PANAMA', 'BANK_OF_VALLETTA_ESCROW'],
    coOccurringTags: [
      { tag: '#SHELL_CORP_PANAMA', correlation: 88 },
      { tag: '#DARK_POOL_ROUTING', correlation: 74 },
      { tag: '#VIP_ALIASED_PASSPORT', correlation: 62 }
    ],
    geoCoordinates: '19.3133° N, 81.2546° W (George Town, Cayman)',
    clearanceLevel: 4,
    anomalyNotes: 'Repeated micro-structuring under $9,999 USD threshold prior to primary wire release.',
    investigatorNotes: 'Financial analysis team flagged account routing to Cyprus offshore intermediary on Aug 28.'
  },
  {
    id: 'tag-2',
    identifier: '#ENCRYPTED_COMMS_V2',
    category: 'COMMUNICATION',
    occurrences: 856,
    weight: 75,
    patternDetect: 'CRITICAL',
    status: 'CRITICAL',
    lastDetected: '2026-09-01 18:20:11 UTC',
    firstDetected: '2024-05-02 11:30:22 UTC',
    description: 'Custom Signal/Matrix protocol tunnels employing 4096-bit ephemeral keys transmitting between tactical burner devices.',
    sourceEvidence: [
      { id: 'SIG-INTERCEPT-404', title: 'Encrypted RF burst packet capture', type: 'LOG', timestamp: '2026-09-01' },
      { id: 'WIRE-TAP-DELTA', title: 'VoIP encrypted metadata stream logs', type: 'AUDIO', timestamp: '2026-08-31' },
      { id: 'HW-EXTRACT-33', title: 'Cryptographic key dump from seized handset', type: 'DOCUMENT', timestamp: '2026-08-25' }
    ],
    linkedEntities: ['OPERATIVE_VIPER', 'CELL_LEADER_KESTREL', 'STATION_BERLIN_RELAY'],
    coOccurringTags: [
      { tag: '#BURNER_PHONE_GEO', correlation: 92 },
      { tag: '#CIPHER_ROT13_KEY', correlation: 68 },
      { tag: '#AIR_GAP_BREACH', correlation: 55 }
    ],
    geoCoordinates: '52.5200° N, 13.4050° E (Berlin Node)',
    clearanceLevel: 5,
    anomalyNotes: 'Key exchange renegotiated every 180 seconds across pseudo-random dynamic UDP ports.',
    investigatorNotes: 'Critical comms window detected during operative rendezvous window.'
  },
  {
    id: 'tag-3',
    identifier: '#BURNER_PHONE_GEO',
    category: 'INCIDENT',
    occurrences: 412,
    weight: 40,
    patternDetect: 'NOMINAL',
    status: 'NOMINAL',
    lastDetected: '2026-09-01 14:05:59 UTC',
    firstDetected: '2024-06-18 09:12:44 UTC',
    description: 'Cellular tower ping triangulations and IMSI-catcher detections associated with unregistered prepaid SIM cards.',
    sourceEvidence: [
      { id: 'GEO-TOWER-PING-88', title: 'Triangulation matrix across Sector 7', type: 'SURVEILLANCE', timestamp: '2026-09-01' },
      { id: 'IMSI-LOG-DOWNTOWN', title: 'IMSI Catcher intercept report #114', type: 'LOG', timestamp: '2026-08-29' }
    ],
    linkedEntities: ['COURIER_UNKNOWN_02', 'VEHICLE_TAG_7X991', 'HOTEL_METROPOLE_SAFEHOUSE'],
    coOccurringTags: [
      { tag: '#DEAD_DROP_GPS', correlation: 81 },
      { tag: '#ENCRYPTED_COMMS_V2', correlation: 92 },
      { tag: '#SURVEILLANCE_BLINDSPOT', correlation: 49 }
    ],
    geoCoordinates: '48.8566° N, 2.3522° E (Paris 8th Arr.)',
    clearanceLevel: 3,
    anomalyNotes: 'Device power-cycled synchronously with embassy motorcade transit.',
    investigatorNotes: 'SIM card deactivated immediately after 3-minute voice burst.'
  },
  {
    id: 'tag-4',
    identifier: '#SHELL_CORP_PANAMA',
    category: 'FINANCIAL',
    occurrences: 618,
    weight: 82,
    patternDetect: 'HIGH',
    status: 'ACTIVE',
    lastDetected: '2026-08-31 22:15:33 UTC',
    firstDetected: '2024-01-14 10:00:00 UTC',
    description: 'Registered bearer-share entities established via Mossack-style offshore legal agents in Panama City and Belize.',
    sourceEvidence: [
      { id: 'CORP-FILING-PAN-09', title: 'Registry of Commerce Panama Articles of Inc', type: 'DOCUMENT', timestamp: '2026-08-22' },
      { id: 'NOMINEE-DIR-DOC', title: 'Nominee Director Power of Attorney', type: 'DOCUMENT', timestamp: '2026-08-19' }
    ],
    linkedEntities: ['CYRUS_HOLDINGS_LLC', 'VALIANT_CORP_PANAMA', 'LAWYER_SANCHEZ_ESTEBAN'],
    coOccurringTags: [
      { tag: '#OFFSHORE_ACCT_TRX', correlation: 88 },
      { tag: '#DARK_POOL_ROUTING', correlation: 65 }
    ],
    geoCoordinates: '8.9824° N, 79.5199° W (Panama City)',
    clearanceLevel: 4,
    anomalyNotes: 'Same nominee director registered across 42 disparate shell companies.',
    investigatorNotes: 'Cross-referenced with Interpol Red Notice corporate intelligence list.'
  },
  {
    id: 'tag-5',
    identifier: '#DEAD_DROP_GPS',
    category: 'INCIDENT',
    occurrences: 294,
    weight: 65,
    patternDetect: 'HIGH',
    status: 'INVESTIGATING',
    lastDetected: '2026-08-31 16:40:02 UTC',
    firstDetected: '2024-07-09 03:22:19 UTC',
    description: 'Physical caching coordinates identified in public parks, underpasses, and magnetic lockboxes with timed pickup windows.',
    sourceEvidence: [
      { id: 'CCTV-STATION-CAM4', title: 'Low-light CCTV footage archive #902', type: 'SURVEILLANCE', timestamp: '2026-08-31' },
      { id: 'FORENSIC-SWAB-04', title: 'Physical retrieval fingerprint report', type: 'DOCUMENT', timestamp: '2026-08-30' }
    ],
    linkedEntities: ['OPERATIVE_VIPER', 'COURIER_UNKNOWN_02'],
    coOccurringTags: [
      { tag: '#BURNER_PHONE_GEO', correlation: 81 },
      { tag: '#SURVEILLANCE_BLINDSPOT', correlation: 77 }
    ],
    geoCoordinates: '50.8503° N, 4.3517° E (Brussels Parc du Cinquantenaire)',
    clearanceLevel: 4,
    anomalyNotes: 'Micro-SD card sealed in industrial waterproof epoxy found magnetically adhered to bench.',
    investigatorNotes: 'Physical surveillance team deployed to perimeter.'
  },
  {
    id: 'tag-6',
    identifier: '#DARK_POOL_ROUTING',
    category: 'FINANCIAL',
    occurrences: 512,
    weight: 78,
    patternDetect: 'CRITICAL',
    status: 'CRITICAL',
    lastDetected: '2026-09-01 17:11:45 UTC',
    firstDetected: '2024-04-19 14:02:11 UTC',
    description: 'Off-exchange institutional liquidity orders routed through non-displayed dark pools to mask large capital flight.',
    sourceEvidence: [
      { id: 'FIN-EXCH-ORDERBOOK', title: 'FIX Protocol Order Flow Capture', type: 'LOG', timestamp: '2026-09-01' },
      { id: 'SEC-FILING-IRREGULAR', title: 'Securities volume anomaly alert', type: 'DOCUMENT', timestamp: '2026-08-27' }
    ],
    linkedEntities: ['SUBJECT-OMEGA', 'APEX_TRADING_LTD', 'BROKER_HAWKINS'],
    coOccurringTags: [
      { tag: '#OFFSHORE_ACCT_TRX', correlation: 74 },
      { tag: '#BITCOIN_MIXER_HOP', correlation: 69 }
    ],
    geoCoordinates: '40.7128° N, 74.0060° W (New York Fin District)',
    clearanceLevel: 5,
    anomalyNotes: 'Block trades executed precisely 30 seconds before major regulatory announcement.',
    investigatorNotes: 'SEC enforcement division referral drafted.'
  },
  {
    id: 'tag-7',
    identifier: '#SATELLITE_UPLINK_09',
    category: 'COMMUNICATION',
    occurrences: 340,
    weight: 58,
    patternDetect: 'HIGH',
    status: 'ACTIVE',
    lastDetected: '2026-09-01 11:04:19 UTC',
    firstDetected: '2024-08-01 22:50:00 UTC',
    description: 'Inmarsat & Iridium high-gain tactical antenna transmissions pinpointed in remote maritime and unmonitored border zones.',
    sourceEvidence: [
      { id: 'SIGINT-SAT-BURST', title: 'L-Band raw telemetry capture', type: 'LOG', timestamp: '2026-09-01' },
      { id: 'AIS-VESSEL-CORRELATION', title: 'Maritime AIS transponder gap analysis', type: 'SURVEILLANCE', timestamp: '2026-08-29' }
    ],
    linkedEntities: ['VESSEL_BLACK_SWAN', 'CELL_LEADER_KESTREL'],
    coOccurringTags: [
      { tag: '#ENCRYPTED_COMMS_V2', correlation: 71 },
      { tag: '#MARITIME_CARGO_SMUGGLING', correlation: 84 }
    ],
    geoCoordinates: '35.8989° N, 14.5146° E (Central Mediterranean)',
    clearanceLevel: 4,
    anomalyNotes: 'Vessel AIS transponder disabled 4 hours prior to sat-comms transmission burst.',
    investigatorNotes: 'Coast Guard maritime patrol aircraft tasked.'
  },
  {
    id: 'tag-8',
    identifier: '#VIP_ALIASED_PASSPORT',
    category: 'INCIDENT',
    occurrences: 178,
    weight: 85,
    patternDetect: 'CRITICAL',
    status: 'CRITICAL',
    lastDetected: '2026-08-30 06:18:22 UTC',
    firstDetected: '2024-02-10 16:45:00 UTC',
    description: 'Biometrically cloned and fraudulently issued diplomatic passports used at Schengen and GCC border checkpoints.',
    sourceEvidence: [
      { id: 'IMM-BORDER-SCAN-11', title: 'ICAO e-Passport chip cryptographic validation log', type: 'LOG', timestamp: '2026-08-30' },
      { id: 'PHOTO-FACIAL-RECOG', title: 'Border gate high-res facial match', type: 'SURVEILLANCE', timestamp: '2026-08-30' }
    ],
    linkedEntities: ['SUBJECT-OMEGA', 'OPERATIVE_VIPER', 'CONSULATE_HONORARY_VANUATU'],
    coOccurringTags: [
      { tag: '#OFFSHORE_ACCT_TRX', correlation: 62 },
      { tag: '#BURNER_PHONE_GEO', correlation: 58 }
    ],
    geoCoordinates: '25.2532° N, 55.3657° E (Dubai Int Airport Terminal 3)',
    clearanceLevel: 5,
    anomalyNotes: 'ICAO biometric signature hash mismatch on digital certificate revocation list.',
    investigatorNotes: 'Airport security covertly tagged luggage with passive beacon.'
  },
  {
    id: 'tag-9',
    identifier: '#BITCOIN_MIXER_HOP',
    category: 'FINANCIAL',
    occurrences: 780,
    weight: 88,
    patternDetect: 'HIGH',
    status: 'ACTIVE',
    lastDetected: '2026-09-01 15:55:30 UTC',
    firstDetected: '2024-05-15 04:10:12 UTC',
    description: 'Tornado Cash / Wasabi CoinJoin multi-hop mixing transactions breaking on-chain UTXO lineage.',
    sourceEvidence: [
      { id: 'CHAIN-ANALYSIS-GRAPH', title: 'On-chain cluster graph #7742', type: 'DOCUMENT', timestamp: '2026-09-01' },
      { id: 'ETH-RPC-TRACE', title: 'Mempool front-running and mixer deposit trace', type: 'LOG', timestamp: '2026-08-31' }
    ],
    linkedEntities: ['WALLET_0x89A_TORNADO', 'SUBJECT-OMEGA', 'CRYPTO_EXCHANGE_NON_KYC'],
    coOccurringTags: [
      { tag: '#DARK_POOL_ROUTING', correlation: 69 },
      { tag: '#TOR_EXIT_NODE_89', correlation: 73 }
    ],
    geoCoordinates: 'N/A (Decentralized Ethereum Network)',
    clearanceLevel: 4,
    anomalyNotes: '120 ETH deposited across 10 distinct privacy pools in 15-minute bursts.',
    investigatorNotes: 'Chain analysis cluster tracking withdrawal addresses at fiat off-ramps.'
  },
  {
    id: 'tag-10',
    identifier: '#TOR_EXIT_NODE_89',
    category: 'COMMUNICATION',
    occurrences: 620,
    weight: 52,
    patternDetect: 'NOMINAL',
    status: 'NOMINAL',
    lastDetected: '2026-09-01 19:10:00 UTC',
    firstDetected: '2024-03-22 17:00:00 UTC',
    description: 'Traffic egress originating from known high-bandwidth Tor onion routing exit relays in Eastern Europe and Iceland.',
    sourceEvidence: [
      { id: 'FIREWALL-NETFLOW-9', title: 'Gateway perimeter NetFlow telemetry', type: 'LOG', timestamp: '2026-09-01' },
      { id: 'SSL-CERT-PROBE', title: 'TLS handshake fingerprint record', type: 'LOG', timestamp: '2026-08-29' }
    ],
    linkedEntities: ['STATION_BERLIN_RELAY', 'OPERATIVE_VIPER'],
    coOccurringTags: [
      { tag: '#BITCOIN_MIXER_HOP', correlation: 73 },
      { tag: '#AIR_GAP_BREACH', correlation: 45 }
    ],
    geoCoordinates: '64.1466° N, 21.9426° W (Reykjavik Relay)',
    clearanceLevel: 3,
    anomalyNotes: 'Correlation with SSH brute-force attempts on internal database gateway.',
    investigatorNotes: 'Traffic routed through Romanian and Icelandic relay relays sequentially.'
  },
  {
    id: 'tag-11',
    identifier: '#AIR_GAP_BREACH',
    category: 'INCIDENT',
    occurrences: 95,
    weight: 98,
    patternDetect: 'CRITICAL',
    status: 'CRITICAL',
    lastDetected: '2026-08-29 02:40:10 UTC',
    firstDetected: '2024-08-29 02:40:10 UTC',
    description: 'Physical USB exfiltration payload triggering ultrasonic acoustics and electromagnetic frequency emissions from isolated terminal.',
    sourceEvidence: [
      { id: 'SCADA-HARDWARE-LOG', title: 'Industrial controller USB insertion log', type: 'LOG', timestamp: '2026-08-29' },
      { id: 'SPECTRUM-SENSOR-01', title: 'RF audio spectrum emission alert', type: 'SURVEILLANCE', timestamp: '2026-08-29' }
    ],
    linkedEntities: ['INSIDER_MOLE_04', 'OPERATIVE_VIPER'],
    coOccurringTags: [
      { tag: '#ENCRYPTED_COMMS_V2', correlation: 55 },
      { tag: '#DEAD_DROP_GPS', correlation: 64 }
    ],
    geoCoordinates: '51.1657° N, 10.4515° E (Facility Site B)',
    clearanceLevel: 5,
    anomalyNotes: 'Stuxnet-class USB driver payload detected in isolated quarantine lab.',
    investigatorNotes: 'Facility locked down. Physical forensics team investigating terminal 4B.'
  },
  {
    id: 'tag-12',
    identifier: '#AUDIO_SPECTROGRAM_MATCH',
    category: 'COMMUNICATION',
    occurrences: 215,
    weight: 64,
    patternDetect: 'ELEVATED',
    status: 'INVESTIGATING',
    lastDetected: '2026-08-31 09:15:33 UTC',
    firstDetected: '2024-06-01 12:00:00 UTC',
    description: 'Voice biometric formant frequency analysis matching target subject across intercepted radio chatter and wiretap audio.',
    sourceEvidence: [
      { id: 'AUDIO-INTERCEPT-99', title: 'Intercepted HF radio transmission recording', type: 'AUDIO', timestamp: '2026-08-31' },
      { id: 'BIOMETRIC-VOICE-ID', title: 'Acoustic vocal tract resonant match 98.4%', type: 'DOCUMENT', timestamp: '2026-08-31' }
    ],
    linkedEntities: ['SUBJECT-OMEGA', 'CELL_LEADER_KESTREL'],
    coOccurringTags: [
      { tag: '#ENCRYPTED_COMMS_V2', correlation: 60 },
      { tag: '#SATELLITE_UPLINK_09', correlation: 51 }
    ],
    geoCoordinates: '41.9028° N, 12.4964° E (Rome Audio Intercept)',
    clearanceLevel: 4,
    anomalyNotes: 'Pitch modification software used by caller to disguise lower formant frequencies.',
    investigatorNotes: 'Spectrogram deconvolution isolated background naval radar hum.'
  }
];

export const CATEGORY_METRICS = [
  {
    id: 'CAT-FIN',
    name: 'FINANCIAL' as const,
    code: 'ID:CAT-FIN',
    count: 428,
    percentage: 65,
    colorClass: 'text-[#FFB84D]',
    badgeBg: 'bg-[#2d2926]',
    badgeBorder: 'border-[#FFB84D] border-opacity-40',
    badgeText: 'text-[#FFB84D]',
    barColor: 'bg-[#FFB84D]'
  },
  {
    id: 'CAT-COM',
    name: 'COMMUNICATION' as const,
    code: 'ID:CAT-COM',
    count: 315,
    percentage: 45,
    colorClass: 'text-[#9dcee1]',
    badgeBg: 'bg-[#2d2926]',
    badgeBorder: 'border-[#9dcee1] border-opacity-40',
    badgeText: 'text-[#9dcee1]',
    barColor: 'bg-[#9dcee1]'
  },
  {
    id: 'CAT-INC',
    name: 'INCIDENT' as const,
    code: 'ID:CAT-INC',
    count: 189,
    percentage: 25,
    colorClass: 'text-[#e06868]',
    badgeBg: 'bg-[#2d2926]',
    badgeBorder: 'border-[#e06868] border-opacity-40',
    badgeText: 'text-[#e06868]',
    barColor: 'bg-[#632424]'
  }
];
