
class Animal {
    a() {
        this.b();
    }
}
class Person extends Animal {
    b() {
        console.log('b');
    }
}
//虽然类有二个
//但是实例只有一个
//只有子类的实例

let p = new Person();
p.a();