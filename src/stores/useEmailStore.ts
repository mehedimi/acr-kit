import { defineStore } from 'pinia'
import type {
  EmailRecovery,
  EmailRecoveryCreatePayload,
  RecoveryOption,
} from '@/types/recovery-option.ts'
import { appHttp } from '@/lib/http.ts'

const BASE_ENDPOINT = '/api/v1/recovery/emails' as const

const ordinalWords = [
  'First',
  'Second',
  'Third',
  'Fourth',
  'Fifth',
  'Sixth',
  'Seventh',
  'Eighth',
  'Ninth',
  'Tenth',
  'Eleventh',
  'Twelfth',
  'Thirteenth',
  'Fourteenth',
  'Fifteenth',
  'Sixteenth',
  'Seventeenth',
  'Eighteenth',
  'Nineteenth',
  'Twentieth',
] as const

export const MINUTES = {
  minute: 1,
  hour: 60,
  day: 60 * 24,
  week: 60 * 24 * 7,
} as const

const abandonedEmailSchedule: number[] = [
  5 * MINUTES.minute, // 5 minutes
  MINUTES.day, // 1 day
  2 * MINUTES.day, // 2 days
  4 * MINUTES.day, // 4 days
  MINUTES.week, // 1 week
]

export const useEmailStore = defineStore('email', {
  state: (): {
    data: EmailRecovery<RecoveryOption>[]
  } => ({
    data: [],
  }),
  actions: {
    fetch() {
      appHttp
        .get<{ data: EmailRecovery<RecoveryOption>[] }>(BASE_ENDPOINT)
        .then(({ data: { data } }) => {
          this.data = data
        })
    },
    async create() {
      const {
        data: { data },
      } = await appHttp.post<{ data: EmailRecovery<RecoveryOption> }>(BASE_ENDPOINT, {
        title: (ordinalWords[this.data.length] || 'Untitled') + ' email',
        recovery: {
          runAfter: (abandonedEmailSchedule[this.data.length] ||
            abandonedEmailSchedule[abandonedEmailSchedule.length - 1]) as number,
        },
        template: [],
        body: 'Hello',
        subject: 'Cart recovery',
      } satisfies EmailRecoveryCreatePayload)

      this.data.push(data)
    },

    async find(id: string) {
      const {
        data: { data },
      } = await appHttp.get<{ data: EmailRecovery<RecoveryOption> }>(`${BASE_ENDPOINT}/${id}`)

      this.data = [data]
    },
  },
  getters: {
    firstEmail() {
      return this.data[0]
    },
  },
})
