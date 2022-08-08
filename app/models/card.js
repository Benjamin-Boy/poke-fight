class Base {
  static HP_FACTOR = 10;

  static ATTACK_FACTOR = 10;
  static DEFENSE_FACTOR = 10;
  static ATTACK_SPE_FACTOR = 10;
  static DEFENSE_SPE_FACTOR = 10;
  static SPEED_FACTOR = 10;
  
  static XP_FACTOR = 10;

  static RANK_FACTOR = [1,2,3,4];

  static PRICE_FACTOR = 10;
}

class Card {
  constructor(name, numero) {
    this.name = name;
    this.numero = numero;
  }

  generateRank() {
    const ranks = ['common', 'rare', 'epic', 'legendary']
    const randRank = Math.floor((Math.random() * ranks.length));

    this.rank = ranks[randRank];
    this.rankFactor = Base.RANK_FACTOR[randRank];
  }

  generateHp(base, rank) {
    let min = base - (base * Base.HP_FACTOR) / 100;
    let max = base + (base * Base.HP_FACTOR) / 100;

    this.hp =  (Math.floor((Math.random() * (max - min+1)) + min) * this.rankFactor);
  }

  generateAttack(base) {
    let min = base - (base * Base.ATTACK_FACTOR) / 100;
    let max = base + (base * Base.ATTACK_FACTOR) / 100;

    this.attack =  Math.floor((Math.random() * (max - min+1)) + min);
  }

  generateDefense(base) {
    let min = base - (base * Base.DEFENSE_FACTOR) / 100;
    let max = base + (base * Base.DEFENSE_FACTOR) / 100;

    this.defense =  Math.floor((Math.random() * (max - min+1)) + min);
  }

  generateAttackSpe(base) {
    let min = base - (base * Base.ATTACK_SPE_FACTOR) / 100;
    let max = base + (base * Base.ATTACK_SPE_FACTOR) / 100;

    this.attack_spe =  Math.floor((Math.random() * (max - min+1)) + min);
  }

  generateDefenseSpe(base) {
    let min = base - (base * Base.DEFENSE_SPE_FACTOR) / 100;
    let max = base + (base * Base.DEFENSE_SPE_FACTOR) / 100;

    this.defense_spe =  Math.floor((Math.random() * (max - min+1)) + min);
  }

  generateSpeed(base) {
    let min = base - (base * Base.SPEED_FACTOR) / 100;
    let max = base + (base * Base.SPEED_FACTOR) / 100;

    this.speed =  Math.floor((Math.random() * (max - min+1)) + min);
  }

  generateLevel(base) {
  //TODO Level dépend de l'XP
    // let min = base - (base * Base.XP_FACTOR) / 100;
    // let max = base + (base * Base.XP_FACTOR) / 100;

    // this.level = Math.floor((Math.random() * (max - min + 1)) + min);
    this.level = 0;
  }

  generatePrice(base) {
    // TODO Prix dépend du level
    // TODO prix dépend rank

    let min = base - (base * Base.PRICE_FACTOR) / 100;
    let max = base + (base * Base.PRICE_FACTOR) / 100;

    this.price =  Math.floor((Math.random() * (max - min+1)) + min);
  }

  
}

module.exports = Card;