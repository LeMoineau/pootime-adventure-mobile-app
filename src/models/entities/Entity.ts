import { DefaultValues } from "../../config/DefaultValues";
import { xpNeededForNextLevel } from "../../constants/stats/level";
import { ultis } from "../../constants/stats/ultis";
import { UltiDetails } from "../../types/Ultis";

export interface EntityProps {
  name: string;
  level?: number;
  pv?: number;
  attaque?: number;
  defense?: number;
  mana?: number;
  recupMana?: number;
  resMana?: number;
  currentPv?: number;
  currentMana?: number;
  ultiSelected?: string | null;
}

export class Entity {
  name: string;
  level: number;
  attaque: number;
  defense: number;
  pv: number;
  mana: number;
  resMana: number;
  recupMana: number;
  currentPv: number;
  currentMana: number;
  ultiSelected: string | null;

  rage?: number;

  constructor({
    name,
    pv = DefaultValues.EntityStats.pv,
    attaque = DefaultValues.EntityStats.attaque,
    defense = DefaultValues.EntityStats.defense,
    mana = DefaultValues.EntityStats.mana,
    recupMana = DefaultValues.EntityStats.recupMana,
    resMana = DefaultValues.EntityStats.resMana,
    level,
    currentPv,
    currentMana = 0,
    ultiSelected = null,
  }: EntityProps) {
    this.name = name;
    this.pv = pv;
    this.attaque = attaque;
    this.defense = defense;
    this.mana = mana;
    this.recupMana = recupMana;
    this.resMana = resMana;
    this.level = level ?? this._calculateLevelFromStats();
    this.currentPv = currentPv ?? this.pv;
    this.currentMana = currentMana;
    this.ultiSelected = ultiSelected;
  }

  /**
   * Calculate the entity level from its stats.
   *
   * The max level is 100
   *
   * @returns current level calculate from entity stats
   */
  _calculateLevelFromStats(): number {
    let currentStars = 0;
    let currentLevel = 1;
    const allStarsUsed = this._calculateAllStarsUsed();
    while (currentStars < allStarsUsed) {
      currentStars += xpNeededForNextLevel(currentLevel);
      currentLevel += 1;
    }
    return currentLevel > 100 ? 100 : currentLevel;
  }

  _calculateAllStarsUsed(): number {
    return (
      (this.pv - DefaultValues.EntityStats.pv) / 5 +
      (this.attaque - DefaultValues.EntityStats.attaque) +
      (this.defense - DefaultValues.EntityStats.defense) +
      (this.mana - DefaultValues.EntityStats.mana) / 5 +
      (this.recupMana - DefaultValues.EntityStats.recupMana) +
      (this.resMana - DefaultValues.EntityStats.resMana)
    );
  }

  receiveAttaque(attaque: number) {
    this.currentPv -= attaque / this.defense;
  }

  receiveSpell(spell: UltiDetails) {
    this.currentPv -=
      (spell.damage ?? 0) / (this.resMana === 0 ? 1 : this.resMana);
  }

  gainMana(manaEarn: number) {
    this.currentMana += manaEarn;
    if (this.currentMana > this.mana) this.currentMana = this.mana;
  }

  loseMana(manaLose: number) {
    this.currentMana -= manaLose;
    if (this.currentMana < 0) this.currentMana = 0;
  }

  hit(entity: Entity) {
    let multiplier = 1;
    if (this.rage && this.rage > 0) {
      this.rage -= 1;
      if (this.rage <= 0) this.rage = undefined;
      multiplier += 1;
    }
    entity.receiveAttaque(this.attaque * multiplier);
    this.gainMana(this.recupMana);
  }

  spell(entity: Entity) {
    if (this.ultiSelected !== null) {
      const ulti = ultis[this.ultiSelected]?.details;
      if (ulti) {
        if (ulti.rage) this.rage = ulti.rage;
        entity.receiveSpell(ulti);
        this.loseMana(ulti.mana);
      }
    }
  }
}
