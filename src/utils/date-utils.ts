export namespace DateUtils {
  export function toDDMMYYYFormat(date: Date): string {
    return `${`${date.getDate()}`.padStart(2, "0")}/${`${
      date.getMonth() + 1
    }`.padStart(2, "0")}/${date.getFullYear()}`;
  }
}
