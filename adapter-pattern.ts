/**
* What is the Adapter Pattern?
* - Allows two incompatible interfaces to work togheter
* - Used when the client expects a (target) interface
* - The adapter class allows the use of the available interface and
*   the Target interface
* - Any class can work togheter as long as the Adapter solves the
*   issue that all classes must implement every method by the shared interface
*
* @see http://www.newthinktank.com/2012/09/adapter-design-pattern-tutorial/
*/

const rand = n => Math.round(Math.random() * n);

interface EnemyAttaker {
    fireWeapon(): void;
    driveForward(): void;
    assignDriver(driverName: string): void;
}

// Target
class EnemyTank implements EnemyAttaker {

    public fireWeapon(): void {
        const attackDamage: number = rand(10);
        console.log(`Enemy tank does ${attackDamage} damage`);
    }

    public driveForward(): void {
        const movement: number = rand(5);
        console.log(`Enemy tank moves ${movement} spaces`);
    }

    public assignDriver(driverName: string): void {
        console.log(`${driverName} is driving the tank`);
    }
}

// Adaptee
class EnemyRobot {

    public smashWithHands(): void {
        const attackDamage: number = rand(10);
        console.log(`Enemy robot causes ${attackDamage} damage with its hands`);
    }

    public walkForward(): void {
        const movement = rand(5);
        console.log(`Enemy robot walks forward ${movement} spaces`);
    }

    public reactToHuman(humanName): void {
        console.log(`Enemy robot tramps on ${humanName}`);
    }
}

class EnemyRobotAdapter implements EnemyAttaker {

    private enemyRobot: EnemyRobot;

    public constructor(enemyRobot: EnemyRobot) {
        this.enemyRobot = enemyRobot;
    }

    public fireWeapon(): void {
        this.enemyRobot.smashWithHands();
    }

    public driveForward(): void {
        this.enemyRobot.walkForward();
    }

    public assignDriver(driverName: string): void {
        this.enemyRobot.reactToHuman(driverName);
    }

}

//---------------------------------------------------------------------------

const rx7Tank: EnemyTank = new EnemyTank();
const fredTheRobot: EnemyRobot = new EnemyRobot();
const robotAdapter: EnemyRobotAdapter = new EnemyRobotAdapter(fredTheRobot);

console.log("The Robot");
fredTheRobot.reactToHuman("Marcelo");
fredTheRobot.walkForward();
fredTheRobot.smashWithHands();

console.log("\nThe enemy tank");
rx7Tank.assignDriver("Jake");
rx7Tank.driveForward();
rx7Tank.fireWeapon();

console.log("\nThe robot with adapter");
robotAdapter.assignDriver("Alex");
robotAdapter.driveForward();
robotAdapter.fireWeapon();
