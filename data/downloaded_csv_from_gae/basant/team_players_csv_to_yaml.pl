#!/usr/bin/perl

use YAML;

use warnings;
use YAML::Dumper;
    my $dumper = YAML::Dumper->new;
    $dumper->indent_width(2);

    
$hash = {};

while ( <> ) {
    chomp;
    last unless /\S/;
    my ($a, $b, $c, $d) = split /","/;
    $a =~ s/"//;
    $d =~ s/"//;
    $hash->{$d}->{'player_'.$a}=$b;
}
# $hash = {'match_01'=>{'start_time'=>'asdf','team_one'=>'asdf_team','team_two'=>'team_adf'}};
    print $dumper->dump($hash);
